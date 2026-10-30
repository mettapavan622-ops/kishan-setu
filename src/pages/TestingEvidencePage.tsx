import React, { useState } from 'react';
import { CheckCircle2, Download, ExternalLink, Search, ShieldCheck } from 'lucide-react';
import report from '../testing-evidence.json';

const collectionUrl = 'https://go.postman.co/collection/58406058-fb29b490-fae0-4680-ba15-3fd726eed7f1';
export default function TestingEvidencePage() {
  const [search, setSearch] = useState('');
  const rows = report.results.filter(row => `${row.name} ${row.method} ${row.path}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="rounded-3xl bg-emerald-950 p-6 text-white sm:p-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-700 px-3 py-1 text-xs font-semibold text-emerald-200"><ShieldCheck size={16} /> API verification · Recorded local run</div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Testing you can inspect.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-100 sm:text-base">KisanSetu’s marketplace API was exercised with Postman against the real local Express server. Explore the results and download the evidence behind every check.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={collectionUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-emerald-950">Open in Postman <ExternalLink size={16} /></a>
          <a href="/testing-evidence/postman-run.txt" download className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 px-4 py-3 text-sm font-semibold"><Download size={16} /> Download CLI evidence</a>
        </div>
      </div>
      <div className="my-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[[report.requests, 'Requests executed'], [report.assertions, 'Assertions passed'], [report.failed, 'Failed assertions'], [`${report.durationMs / 1000}s`, 'Total run duration']].map(([value, label]) => <div key={label} className="rounded-2xl border border-stone-200 bg-white p-5"><p className="text-3xl font-bold text-emerald-800">{value}</p><p className="mt-1 text-xs text-stone-600">{label}</p></div>)}
      </div>
      <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-6" aria-labelledby="scope-heading">
        <h2 id="scope-heading" className="text-lg font-bold text-stone-900">What this run establishes</h2>
        <p className="mt-2 text-sm leading-7 text-stone-600">Authentication and profile preferences, supplier and buyer permissions, produce listing and filtering, stock reservation and release, bulk pricing, checkout totals, partial acceptance, order progression, inventory audit records, notification logs, and weather response structure.</p>
        <p className="mt-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">This is a saved local regression result, not a live production health check or a complete security audit. SMS delivery and weather are simulated by the application. External providers, production deployment, concurrency, and load were not verified.</p>
        <dl className="mt-5 grid gap-4 text-xs sm:grid-cols-3"><div><dt className="text-stone-500">Runner / exit code</dt><dd className="mt-1 font-semibold">{report.runner} / {report.exitCode}</dd></div><div><dt className="text-stone-500">Test target</dt><dd className="mt-1 font-mono">{report.target}</dd></div><div><dt className="text-stone-500">Tested source revision</dt><dd className="mt-1"><a className="font-mono text-emerald-800 underline" href={`https://github.com/mettapavan622-ops/kishan-setu/commit/${report.sourceCommit}`} target="_blank" rel="noreferrer">{report.sourceCommit.slice(0, 12)}</a></dd></div></dl>
      </section>
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white" aria-labelledby="results-heading">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6"><div><h2 id="results-heading" className="text-lg font-bold">Request-by-request evidence</h2><p className="mt-1 text-xs text-stone-500">{rows.length} of {report.requests} requests · Expected error responses also pass their tests</p></div><label className="flex items-center gap-2 rounded-xl border border-stone-300 px-3 py-2 text-stone-600"><Search size={16} /><input aria-label="Search test results" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search tests or endpoints" className="min-w-0 w-48 bg-transparent text-sm outline-none" /></label></div>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Recorded Postman API request results</caption><thead className="bg-stone-50 text-xs text-stone-500"><tr>{['Test / endpoint', 'HTTP', 'Assertions', 'Time', 'Result'].map(title => <th key={title} scope="col" className="px-6 py-3 font-semibold">{title}</th>)}</tr></thead><tbody className="divide-y divide-stone-100">{rows.map(row => <tr key={row.name}><th scope="row" className="px-6 py-4 font-normal"><div className="font-semibold text-stone-900">{row.name}</div><div className="mt-1 break-all font-mono text-xs text-stone-500">{row.method} {row.path}</div></th><td className="px-6 py-4 font-mono">{row.status}</td><td className="px-6 py-4">{row.assertions} passed</td><td className="whitespace-nowrap px-6 py-4 text-stone-500">{row.durationMs} ms</td><td className="px-6 py-4"><span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700"><CheckCircle2 size={15} /> Pass</span></td></tr>)}</tbody></table>{rows.length === 0 && <p className="p-8 text-center text-sm text-stone-500">No tests match your search.</p>}</div>
      </section>
      <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold text-emerald-800"><a href="/testing-evidence/KisanSetu.postman_collection.json" download className="underline">Download collection JSON</a><a href="/testing-evidence/results.json" download className="underline">Download results JSON</a></div>
      <p className="mt-5 text-xs leading-6 text-stone-500">To reproduce: start a disposable local server, import the collection into Postman, and run all requests in order with baseUrl set to http://localhost:3000. The run creates test accounts and orders in memory and removes its test product. Restart the server to reset its state. Workspace access may be required to open the Postman link.</p>
    </div>
  );
}
