/**
 * api.js — ភ្ជាប់ទំព័រ GitHub Pages ទៅ Google Apps Script (Google Sheet)
 *
 * មានវិធី ២ យ៉ាង (ជ្រើសមួយ)៖
 *  ក. ដាក់ Web app URL ខាងក្រោម (ល្អបំផុត — គ្រប់កុំព្យូទ័រប្រើបានភ្លាម)
 *  ខ. ទុកដដែល ហើយបិទភ្ជាប់ URL ក្នុងប្រអប់ "ភ្ជាប់ទៅ Google Sheet" នៅទំព័រ Login
 *     (ចងចាំក្នុង browser នោះ — កុំព្យូទ័រ/ទូរសព្ទនីមួយៗត្រូវបិទភ្ជាប់ម្ដង)
 *
 * Apps Script៖ Deploy → Web app · Execute as: Me · Who has access: Anyone
 */
var API_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';

(function () {
  'use strict';
  var KEY = 'physicalTestApiUrl';

  function valid(u) {
    return /^https:\/\/script\.google\.com\/(a\/[^\/]+\/)?macros\/s\/[\w-]+\/exec$/.test(String(u || '').trim());
  }
  function url() {
    if (valid(API_URL)) return API_URL.trim();
    try { var u = localStorage.getItem(KEY); if (valid(u)) return u; } catch (e) {}
    return '';
  }
  function setUrl(u) { try { localStorage.setItem(KEY, String(u).trim()); } catch (e) {} }

  function post(target, fn, args) {
    return fetch(target, {
      method: 'POST',
      redirect: 'follow',
      // text/plain → គ្មាន CORS preflight (Apps Script មិនគាំទ្រ preflight)
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ fn: fn, args: args || [] })
    })
      .catch(function () {
        throw new Error('មិនអាចភ្ជាប់ទៅ Google Sheet បានទេ — សូមពិនិត្យអ៊ីនធឺណិត និង Web app URL');
      })
      .then(function (res) {
        if (!res.ok) throw new Error('Server error (HTTP ' + res.status + ')');
        return res.text();
      })
      .then(function (text) {
        var j;
        try { j = JSON.parse(text); }
        catch (e) { throw new Error('Apps Script មិនឆ្លើយតបត្រឹមត្រូវ — សូម Deploy ជា "Anyone" ជា New version ហើយប្រើ Code.gs ថ្មី'); }
        if (!j.ok) throw new Error(j.error || 'Unknown error');
        return j.data;
      });
  }

  function call(fn, args) { return post(url(), fn, args); }

  // ពិនិត្យ URL៖ ហៅ checkSession គ្មាន token → ត្រូវតែឆ្លើយ "AUTH" (មានន័យថា Code.gs ថ្មីដំណើរការ)
  function test(u) {
    return post(u, 'checkSession', ['']).then(
      function () { return true; },
      function (err) {
        if (/AUTH/.test(err.message)) return true;
        if (/Unknown action/.test(err.message)) throw new Error('Code.gs ក្នុង Apps Script នៅចាស់ — សូមប្ដូរជាថ្មី ហើយ Deploy New version');
        throw err;
      });
  }

  window.API = {
    call: call, test: test, valid: valid, setUrl: setUrl, url: url,
    configured: function () { return !!url(); }
  };
})();
