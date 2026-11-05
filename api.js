/**
 * api.js — ភ្ជាប់ទំព័រ GitHub Pages ទៅ Google Apps Script (Google Sheet)
 *
 * ១. Deploy Code.gs ជា Web app (Execute as: Me · Who has access: Anyone)
 * ២. ចម្លង Web app URL (…/exec) មកដាក់ខាងក្រោម
 */
var API_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';

(function () {
  'use strict';

  function configured() {
    return /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(API_URL);
  }

  // ហៅ function ក្នុង Code.gs៖ API.call('listRecords', [token, 'q'])
  // ប្រើ Content-Type text/plain ដើម្បីកុំឲ្យ browser ផ្ញើ CORS preflight (Apps Script មិនគាំទ្រ)
  function call(fn, args) {
    return fetch(API_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ fn: fn, args: args || [] })
    })
      .catch(function () {
        throw new Error('មិនអាចភ្ជាប់ទៅ Server បានទេ — សូមពិនិត្យអ៊ីនធឺណិត ឬ API_URL ក្នុង api.js');
      })
      .then(function (res) {
        if (!res.ok) throw new Error('Server error (HTTP ' + res.status + ')');
        return res.text();
      })
      .then(function (text) {
        var j;
        try { j = JSON.parse(text); }
        catch (e) { throw new Error('Server មិនបានឆ្លើយតបជា JSON — សូមពិនិត្យថា Deploy ជា "Anyone" និងជា Version ចុងក្រោយ'); }
        if (!j.ok) throw new Error(j.error || 'Unknown error');
        return j.data;
      });
  }

  window.API = { call: call, configured: configured, url: function () { return API_URL; } };
})();
