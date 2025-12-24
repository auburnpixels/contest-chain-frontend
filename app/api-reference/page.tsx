"use client";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileJson, Code2, Lock, Copy, Check, Globe, Gauge, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Helper function for consistent badge styling across sidebar and main content
function getMethodBadgeStyles(method: string) {
  switch (method) {
    case 'POST':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'GET':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'PUT':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'DELETE':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}

function getMethodTextColor(method: string) {
  switch (method) {
    case 'POST':
      return 'text-blue-600';
    case 'GET':
      return 'text-emerald-600';
    case 'PUT':
      return 'text-amber-600';
    case 'DELETE':
      return 'text-rose-600';
    default:
      return 'text-gray-500';
  }
}

// Sidebar nav item component for DRY
function SidebarNavItem({ href, method, label }: { href: string; method: string; label: string }) {
  return (
    <li>
      <a 
        href={href} 
        className="group flex items-center pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"
      >
        <Badge 
          variant="outline" 
          className={cn("mr-2 text-[10px] px-1.5 py-0.5 font-mono", getMethodBadgeStyles(method))}
        >
          {method}
        </Badge>
        <span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">
          {label}
        </span>
      </a>
    </li>
  );
}

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[var(--veristiq-slate)] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
         
         <div className="container mx-auto px-6 text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                <Code2 className="w-8 h-8 text-[var(--veristiq-primary-blue)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
               API Reference
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
               Complete documentation for the Veristiq REST API.
               Manage competitions, process entries, and verify results programmatically.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button size="lg" className="bg-white text-[var(--veristiq-slate)] hover:bg-gray-100 rounded-lg h-14 px-8 font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
                 <FileJson className="mr-2 h-4 w-4" />
                 Download OpenAPI Spec
               </Button>
               <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-lg h-14 px-8 font-semibold hover:-translate-y-0.5 transition-all">
                 <Code2 className="mr-2 h-4 w-4" />
                 Postman Collection
               </Button>
            </div>
         </div>
      </section>

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 items-start max-w-7xl">
        
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block w-72 sticky top-28 shrink-0 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-200 h-[calc(100vh-140px)] overflow-y-auto pr-4 sidebar-scrollbar">
          <div className="space-y-4">
            <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4">
                Getting Started
            </h3>
            <ul className="space-y-1 border-l border-gray-200">
              <li><a href="#authentication" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Authentication</a></li>
              <li><a href="#errors" className="block pl-4 text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-primary-blue)] hover:border-l-2 hover:border-[var(--veristiq-primary-blue)] transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Errors</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Competitions
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <SidebarNavItem href="#create-competition" method="POST" label="Create competition" />
                    <SidebarNavItem href="#get-competition" method="GET" label="Get competition" />
                    <SidebarNavItem href="#update-competition" method="PUT" label="Update competition" />
                    <SidebarNavItem href="#close-competition" method="POST" label="Close competition" />
                    <SidebarNavItem href="#get-competition-stats" method="GET" label="Get stats" />
                </ul>
            </div>
            
            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Entries
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <SidebarNavItem href="#submit-entry" method="POST" label="Submit entry" />
                    <SidebarNavItem href="#submit-free-entry" method="POST" label="Submit free entry" />
                    <SidebarNavItem href="#void-entry" method="DELETE" label="Void entry" />
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Draws
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <SidebarNavItem href="#trigger-draw" method="POST" label="Trigger draw" />
                    <SidebarNavItem href="#get-audits" method="GET" label="Get audit logs" />
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Compliance
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <SidebarNavItem href="#get-compliance" method="GET" label="Get compliance" />
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Complaints
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <SidebarNavItem href="#log-complaint" method="POST" label="Log complaint" />
                </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">

          {/* API Info Card */}
          <Card className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-slate-200/60 shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Globe className="w-4 h-4 text-[var(--veristiq-primary-blue)]" />
                  </div>
                  <div>
                    <p className="text-[var(--veristiq-slate-light)] uppercase text-[10px] font-semibold tracking-wider mb-1">Base URL</p>
                    <code className="text-[var(--veristiq-slate)] font-mono text-sm">https://api.veristiq.com</code>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Gauge className="w-4 h-4 text-[var(--veristiq-primary-blue)]" />
                  </div>
                  <div>
                    <p className="text-[var(--veristiq-slate-light)] uppercase text-[10px] font-semibold tracking-wider mb-1">Rate Limit</p>
                    <p className="text-[var(--veristiq-slate)] text-sm">1,000 requests / minute</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Tag className="w-4 h-4 text-[var(--veristiq-primary-blue)]" />
                  </div>
                  <div>
                    <p className="text-[var(--veristiq-slate-light)] uppercase text-[10px] font-semibold tracking-wider mb-1">API Version</p>
                    <p className="text-[var(--veristiq-slate)] text-sm">v1 <span className="text-emerald-600 text-xs">(current)</span></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication */}
          <section id="authentication" className="scroll-mt-32">
             <div className="mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Authentication</h2>
             </div>
             <Card className="bg-white border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 space-y-6">
                   <p className="text-[var(--veristiq-slate-light)] leading-relaxed text-lg">
                      The API uses Bearer Token authentication. Include these headers with every request:
                   </p>
                   <CodeBlock code={`Authorization: Bearer caas_live_your_api_key
Content-Type: application/json`} />
                   <div className="flex gap-4 items-start text-sm text-amber-800 bg-amber-50 p-6 rounded-lg border border-amber-100">
                      <Lock className="h-5 w-5 mt-0.5 flex-shrink-0 text-amber-500" />
                      <p className="leading-relaxed">Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.</p>
                   </div>
                   <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-[var(--veristiq-slate)] mb-3 font-semibold">Quick Start</p>
                      <p className="text-sm text-[var(--veristiq-slate-light)] mb-4">Make your first API call to check your compliance status:</p>
                      <CodeBlock code={`curl -X GET "https://api.veristiq.com/api/v1/operator/compliance" \\
  -H "Authorization: Bearer caas_live_your_api_key" \\
  -H "Content-Type: application/json"`} />
                   </div>
                </CardContent>
             </Card>
          </section>

          {/* Errors */}
          <section id="errors" className="scroll-mt-32">
             <div className="mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Errors</h2>
             </div>
             <Card className="bg-white border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <CardContent className="p-0">
                   <p className="text-[var(--veristiq-slate-light)] leading-relaxed p-8 pb-4">
                      The API uses conventional HTTP response codes to indicate the success or failure of a request.
                   </p>
                   <div className="border-t border-gray-100">
                     <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-[var(--veristiq-slate-light)] font-medium uppercase text-xs">
                           <tr>
                              <th className="px-8 py-4 text-left tracking-wider">Code</th>
                              <th className="px-8 py-4 text-left tracking-wider">Status</th>
                              <th className="px-8 py-4 text-left tracking-wider">Description</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                           <tr className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-4"><Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-mono">200</Badge></td>
                              <td className="px-8 py-4 font-medium text-[var(--veristiq-slate)]">OK</td>
                              <td className="px-8 py-4 text-[var(--veristiq-slate-light)]">The request succeeded.</td>
                           </tr>
                           <tr className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-4"><Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-mono">201</Badge></td>
                              <td className="px-8 py-4 font-medium text-[var(--veristiq-slate)]">Created</td>
                              <td className="px-8 py-4 text-[var(--veristiq-slate-light)]">A new resource was created successfully.</td>
                           </tr>
                           <tr className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-4"><Badge className="bg-amber-100 text-amber-700 border-amber-200 font-mono">400</Badge></td>
                              <td className="px-8 py-4 font-medium text-[var(--veristiq-slate)]">Bad Request</td>
                              <td className="px-8 py-4 text-[var(--veristiq-slate-light)]">The request was malformed or missing required parameters.</td>
                           </tr>
                           <tr className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-4"><Badge className="bg-rose-100 text-rose-700 border-rose-200 font-mono">401</Badge></td>
                              <td className="px-8 py-4 font-medium text-[var(--veristiq-slate)]">Unauthorized</td>
                              <td className="px-8 py-4 text-[var(--veristiq-slate-light)]">Invalid or missing API key.</td>
                           </tr>
                           <tr className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-4"><Badge className="bg-rose-100 text-rose-700 border-rose-200 font-mono">404</Badge></td>
                              <td className="px-8 py-4 font-medium text-[var(--veristiq-slate)]">Not Found</td>
                              <td className="px-8 py-4 text-[var(--veristiq-slate-light)]">The requested resource does not exist.</td>
                           </tr>
                           <tr className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-4"><Badge className="bg-rose-100 text-rose-700 border-rose-200 font-mono">422</Badge></td>
                              <td className="px-8 py-4 font-medium text-[var(--veristiq-slate)]">Validation Error</td>
                              <td className="px-8 py-4 text-[var(--veristiq-slate-light)]">The request body failed validation rules.</td>
                           </tr>
                           <tr className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-4"><Badge className="bg-rose-100 text-rose-700 border-rose-200 font-mono">429</Badge></td>
                              <td className="px-8 py-4 font-medium text-[var(--veristiq-slate)]">Too Many Requests</td>
                              <td className="px-8 py-4 text-[var(--veristiq-slate-light)]">Rate limit exceeded. Slow down your requests.</td>
                           </tr>
                           <tr className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-4"><Badge className="bg-rose-100 text-rose-700 border-rose-200 font-mono">500</Badge></td>
                              <td className="px-8 py-4 font-medium text-[var(--veristiq-slate)]">Server Error</td>
                              <td className="px-8 py-4 text-[var(--veristiq-slate-light)]">An unexpected error occurred on our end.</td>
                           </tr>
                        </tbody>
                     </table>
                   </div>
                </CardContent>
             </Card>
          </section>

          {/* Competitions */}
          <section id="competitions" className="scroll-mt-32">
             <div className="mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Competitions</h2>
             </div>
             
             <div className="space-y-12">
                {/* POST /api/v1/operator/competitions */}
                <div id="create-competition" className="scroll-mt-32">
                    <Endpoint 
                    method="POST" 
                    path="/api/v1/operator/competitions" 
                    title="Create Competition"
                    description="Creates a new competition instance. Returns the created competition object with a UUID."
                    successCode={201}
                    >
                    <Tabs defaultValue="body" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="body" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Request Body</TabsTrigger>
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body">
                            <Table>
                                <Row name="external_id" type="string" required description="Your unique identifier for this competition." />
                                <Row name="name" type="string" required description="Public name/title of the competition." />
                                <Row name="max_tickets" type="integer" required description="Total available tickets." />
                                <Row name="draw_at" type="timestamp" required description="Scheduled draw time (ISO 8601 format)." />
                                <Row name="prizes" type="array" required description="Array of prizes for this competition (minimum 1 prize required)." />
                                <Row name="prizes[].external_id" type="string" required description="Your unique identifier for this prize within the competition." />
                                <Row name="prizes[].name" type="string" required description="Name/title of the prize." />
                            </Table>
                            <div className="mt-8">
                                <p className="text-sm text-[var(--veristiq-slate)] mb-3 font-semibold">Example Request</p>
                                <CodeBlock code={`{
  "external_id": "APPLE_PRODUCTS",
  "name": "Apple Mega Giveaway",
  "max_tickets": 1000,
  "draw_at": "2025-12-25T12:00:00Z",
  "prizes": [
    {
      "external_id": "MACBOOK",
      "title": "Macbook Pro"
    },
    {
      "external_id": "IPAD",
      "title": "iPad Air"
    },
    {
      "external_id": "IPHONE17PRO",
      "title": "iPhone 17 Pro"
    }
  ]
}`} />
                            </div>
                        </TabsContent>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
  "name": "Apple Products",
  "status": "pending",
  "external_id": "APPLE_PRODUCTS",
  "max_tickets": 1000,
  "draw_at": "2025-12-25T12:00:00Z",
  "created_at": "2025-11-25T12:00:00.000000Z",
  "prizes": [
    {
      "id": "3c169add-b41b-4024-a39a-eefc1f5d27c8",
      "external_id": "IPAD",
      "title": "iPad 2026",
      "winner": {
        "entry": {
          "external_id": null
        }
      },
      "draw": {
        "has_been_drawn": false,
        "order": 1,
        "drawn_at": null
      }
    }
  ],
  "statistics": {
    "total_entries": 0,
    "paid_entries": 0,
    "free_entries": 0,
    "draws_completed": 0
  }
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>

                {/* GET /api/v1/operator/competitions/{external_id} */}
                <div id="get-competition" className="scroll-mt-32">
                    <Endpoint 
                    method="GET" 
                    path="/api/v1/operator/competitions/{external_id}" 
                    title="Get Competition"
                    description="Retrieves details and current status of a competition by your external ID. Includes all prizes with their draw status."
                    >
                    <Tabs defaultValue="response" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
  "name": "Apple Products",
  "status": "active",
  "external_id": "APPLE_PRODUCTS",
  "max_tickets": 1000,
  "draw_at": "2025-12-25T12:00:00Z",
  "created_at": "2025-11-25T12:00:00.000000Z",
  "prizes": [...],
  "statistics": {
    "total_entries": 450,
    "paid_entries": 420,
    "free_entries": 30,
    "draws_completed": 0
  }
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>

                {/* PUT /api/v1/operator/competitions/{external_id} */}
                <div id="update-competition" className="scroll-mt-32">
                    <Endpoint 
                    method="PUT" 
                    path="/api/v1/operator/competitions/{external_id}" 
                    title="Update Competition"
                    description="Updates an existing competition's details. Prize modifications are only allowed when status is 'pending' or 'active', and prizes that have been drawn cannot be deleted."
                    >
                        <Tabs defaultValue="body" className="w-full">
                            <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                                <TabsTrigger value="body" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Request Body</TabsTrigger>
                                <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                            </TabsList>
                            <TabsContent value="body">
                                <Table>
                                    <Row name="name" type="string" description="Public name/title of the competition." />
                                    <Row name="max_tickets" type="integer" description="Total available tickets." />
                                    <Row name="draw_at" type="timestamp" description="Scheduled draw time (ISO 8601 format)." />
                                    <Row name="prizes" type="array" description="Array of prizes for this competition." />
                                </Table>
                                <div className="mt-8">
                                    <p className="text-sm text-[var(--veristiq-slate)] mb-3 font-semibold">Example Request</p>
                                    <CodeBlock code={`{
  "name": "Samsung Products",
  "max_tickets": 20000,
  "draw_at": "2026-01-01T11:00:00Z",
  "prizes": [
    {
      "external_id": "GALAXY_TAB_11",
      "title": "Galaxy Tab 11"
    }
  ]
}`} />
                                </div>
                            </TabsContent>
                            <TabsContent value="response">
                                <CodeBlock code={`{
  "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
  "name": "Samsung Products",
  "status": "pending",
  "external_id": "SAMSUNG_PRODUCTS",
  "max_tickets": 20000,
  "draw_at": "2026-01-01T11:00:00Z",
  "updated_at": "2025-11-26T10:30:00.000000Z"
}`} />
                            </TabsContent>
                        </Tabs>
                    </Endpoint>
                </div>

                {/* POST /api/v1/operator/competitions/{external_id}/close */}
                 <div id="close-competition" className="scroll-mt-32">
                    <Endpoint 
                    method="POST" 
                    path="/api/v1/operator/competitions/{external_id}/close" 
                    title="Close Competition"
                    description="Closes the competition to new entries, preparing it for the draw."
                    >
                    <Tabs defaultValue="response" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
  "status": "awaiting_draw",
  "closed_at": "2025-12-25T11:59:00.000000Z"
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                 </div>

                 {/* GET /api/v1/operator/competitions/{external_id}/stats */}
                 <div id="get-competition-stats" className="scroll-mt-32">
                    <Endpoint 
                    method="GET" 
                    path="/api/v1/operator/competitions/{external_id}/stats" 
                    title="Get Competition Stats"
                    description="Retrieves statistics including total entries, revenue estimates, and remaining tickets."
                    >
                    <Tabs defaultValue="response" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "competition_id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
  "total_entries": 1250,
  "paid_entries": 1200,
  "free_entries": 50,
  "tickets_sold": 1250,
  "tickets_remaining": 750,
  "percentage_sold": 62.5
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                 </div>
             </div>
          </section>

          {/* Entries */}
          <section id="entries" className="scroll-mt-32">
             <div className="mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Entries</h2>
             </div>

             <div className="space-y-12">
                <div id="submit-entry" className="scroll-mt-32">
                    <Endpoint 
                    method="POST" 
                    path="/api/v1/operator/competitions/{competition_external_id}/entries" 
                    title="Submit Paid Entry"
                    description="Registers a paid entry for a user. Returns the assigned ticket number(s)."
                    successCode={201}
                    >
                    <Tabs defaultValue="body" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="body" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Request Body</TabsTrigger>
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body">
                            <Table>
                                <Row name="external_id" type="string" required description="Your unique transaction/entry ID." />
                                <Row name="user_reference" type="string" description="User identifier (hashed/masked recommended for privacy)." />
                                <Row name="eligible" type="boolean" required description="Whether this entry is eligible for the draw." />
                            </Table>
                        </TabsContent>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "id": "1f77fede-d5fc-45b3-9099-9e271f937c7a",
  "external_id": "TXN_12345",
  "ticket_number": 1,
  "is_free": false,
  "user_reference": "user_123",
  "is_eligible": true,
  "created_at": "2025-11-20T10:45:39.000000Z",
  "competition": {
    "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
    "external_id": "SAMSUNG_PRODUCTS"
  }
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>

                <div id="submit-free-entry" className="scroll-mt-32">
                    <Endpoint 
                    method="POST" 
                    path="/api/v1/operator/competitions/{competition_external_id}/free-entries" 
                    title="Submit Free Entry"
                    description="Registers a postal or promotional entry. These are tracked separately for compliance reporting."
                    successCode={201}
                    >
                    <Tabs defaultValue="body" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="body" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Request Body</TabsTrigger>
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body">
                            <Table>
                                <Row name="external_id" type="string" required description="Your unique transaction/entry ID." />
                                <Row name="user_reference" type="string" required description="Identifier for the user submitting the free entry." />
                                <Row name="reason" type="string" description="Reason for free entry (e.g., 'postal', 'promotional')." />
                                <Row name="eligible" type="boolean" required description="Whether this entry is eligible for the draw." />
                            </Table>
                        </TabsContent>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "id": "b661d1e1-b97e-4787-bcd4-76e8bba2b5d4",
  "external_id": "POSTAL_001",
  "ticket_number": 2,
  "is_free": true,
  "user_reference": "user_456",
  "is_eligible": true,
  "created_at": "2025-11-20T10:48:22.000000Z",
  "competition": {
    "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
    "external_id": "SAMSUNG_PRODUCTS"
  }
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>

                <div id="void-entry" className="scroll-mt-32">
                    <Endpoint 
                    method="DELETE" 
                    path="/api/v1/operator/competitions/{competition_external_id}/entries/{entry_external_id}" 
                    title="Void Entry"
                    description="Voids a previously submitted entry. This action is recorded in the audit log."
                    >
                        <Tabs defaultValue="body" className="w-full">
                            <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                                <TabsTrigger value="body" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Request Body</TabsTrigger>
                                <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                            </TabsList>
                            <TabsContent value="body">
                                <Table>
                                    <Row name="reason" type="string" description="Must be one of: refund, cancellation, duplicate, fraud, other" />
                                    <Row name="notes" type="string" description="Additional information about the void." />
                                </Table>
                            </TabsContent>
                            <TabsContent value="response">
                                <CodeBlock code={`{
  "message": "Entry voided successfully.",
  "reason": "refund",
  "voided_at": "2025-11-20T12:00:00.000000Z",
  "entry": {
    "id": "1f77fede-d5fc-45b3-9099-9e271f937c7a",
    "external_id": "TXN_12345",
    "ticket_number": 1
  }
}`} />
                            </TabsContent>
                        </Tabs>
                    </Endpoint>
                </div>
             </div>
          </section>

          {/* Draws */}
          <section id="draws" className="scroll-mt-32">
             <div className="mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Draws</h2>
             </div>

             <div className="space-y-12">
                <div id="trigger-draw" className="scroll-mt-32">
                    <Endpoint 
                    method="POST" 
                    path="/api/v1/operator/competitions/{competition_external_id}/draws/run" 
                    title="Trigger Draw"
                    description="Initiates the CSPRNG draw process. You can draw a specific prize or all undrawn prizes at once. When drawing all prizes, previous winners are automatically excluded from subsequent prize draws."
                    >
                    <Tabs defaultValue="response" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "success": true,
  "competition_id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
  "total_prizes_drawn": 2,
  "draws": [
    {
      "id": "d1a2b3c4-5e6f-7890-abcd-ef1234567890",
      "drawn_at": "2025-11-20T11:25:24.000000Z",
      "signature_hash": "71b4d0f1d3e8f145b60d37f1bf2b7d7c...",
      "prize": {
        "title": "Galaxy Tab 11"
      },
      "winner": {
        "entry": {
          "ticket_number": 1
        }
      }
    }
  ],
  "audit_url": "https://veristiq.com/audit/956774e8..."
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>
                
                <div id="get-audits" className="scroll-mt-32">
                    <Endpoint 
                    method="GET" 
                    path="/api/v1/operator/competitions/{competition_external_id}/audits" 
                    title="Get Audit Logs"
                    description="Retrieves the full cryptographic audit chain and event history for a competition. Each prize draw creates its own audit record linked to the global audit chain."
                    >
                    <Tabs defaultValue="response" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "competition_id": "CHRISTMAS2025",
  "total_draws": 3,
  "audits": [
    {
      "draw_id": "d1a2b3c4-5e6f-7890-abcd-ef1234567890",
      "prize_id": "GRAND_PRIZE",
      "rng_seed_hash": "a3f8d9e2c1b4a5f6d7e8c9b0a1f2d3...",
      "signature_hash": "a3f8d9e2c1b4a5f6d7e8c9b0a1f2d3...",
      "previous_signature_hash": "f2a8c9d4e5b6a7c8d9e0f1a2b3c4...",
      "pool_hash": "d4f2a8c9e0b1c2d3e4f5a6b7c8d9..."
    }
  ]
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>
             </div>
          </section>

          {/* Compliance */}
          <section id="compliance" className="scroll-mt-32">
             <div className="mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Compliance</h2>
             </div>

             <div className="space-y-12">
                <div id="get-compliance" className="scroll-mt-32">
                    <Endpoint 
                    method="GET" 
                    path="/api/v1/operator/compliance" 
                    title="Get Compliance Summary"
                    description="Retrieves your current compliance score and any outstanding requirements."
                    >
                    <Tabs defaultValue="response" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "overall_score": 98,
  "status": "compliant",
  "requirements": [
    {
      "id": "req_audit_logs",
      "status": "pass",
      "description": "All draws have verifiable audit logs"
    },
    {
      "id": "req_complaints",
      "status": "pass",
      "description": "Complaint resolution under 72h"
    }
  ]
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>
             </div>
          </section>

          {/* Complaints */}
          <section id="complaints" className="scroll-mt-32">
             <div className="mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Complaints</h2>
             </div>

             <div className="space-y-12">
                <div id="log-complaint" className="scroll-mt-32">
                    <Endpoint 
                    method="POST" 
                    path="/api/v1/operator/complaints" 
                    title="Log Complaint"
                    description="Log a user complaint for regulatory tracking and resolution."
                    successCode={201}
                    >
                    <Tabs defaultValue="body" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="body" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Request Body</TabsTrigger>
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body">
                            <Table>
                                <Row name="competition_external_id" type="string" required description="External ID of the related competition." />
                                <Row name="user_reference" type="string" description="Your internal user/customer ID for the complainant." />
                                <Row name="category" type="string" required description="One of: draw_fairness, entry_issue, prize_issue, payment_issue, other" />
                                <Row name="description" type="string" required description="Details of the complaint." />
                            </Table>
                        </TabsContent>
                        <TabsContent value="response">
                            <CodeBlock code={`{
  "id": "c1d2e3f4-5678-90ab-cdef-1234567890ab",
  "competition_external_id": "comp-12345",
  "user_reference": "user-67890",
  "category": "draw_fairness",
  "status": "pending",
  "created_at": "2025-11-20T12:00:00.000000Z"
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>
             </div>
          </section>

          {/* Need Help */}
          <Card className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-slate-200/60 shadow-sm mt-8">
            <CardContent className="p-8 text-center">
              <h3 className="font-bold text-xl text-[var(--veristiq-slate)] mb-2">Need Help?</h3>
              <p className="text-[var(--veristiq-slate-light)] mb-6 max-w-md mx-auto">
                Having trouble integrating with the API? Our team is here to help you get up and running.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="border-[var(--veristiq-primary-blue)] text-[var(--veristiq-primary-blue)] hover:bg-blue-50" asChild>
                  <a href="/contact">Contact Support</a>
                </Button>
                <Button variant="ghost" className="text-[var(--veristiq-slate-light)] hover:text-[var(--veristiq-slate)]" asChild>
                  <a href="/docs">View Full Docs</a>
                </Button>
              </div>
            </CardContent>
          </Card>

        </main>
      </div>

      <SiteFooter />
    </div>
  );
}

// Helper Components
function Endpoint({ method, path, title, description, successCode = 200, children }: { 
  method: string, 
  path: string, 
  title: string, 
  description: string, 
  successCode?: number,
  children?: React.ReactNode 
}) {
   const badgeStyles = getMethodBadgeStyles(method);
   const methodColorText = getMethodTextColor(method);
   const [copied, setCopied] = useState(false);

   const copyPath = () => {
     navigator.clipboard.writeText(`https://api.veristiq.com${path}`);
     setCopied(true);
     setTimeout(() => setCopied(false), 2000);
   };

   return (
      <Card className="bg-white border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-xl group">
         <div className="p-8 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-5">
               <div className="flex items-center gap-3">
                    <Badge variant="outline" className={cn(badgeStyles, "border px-3 py-1 rounded-md font-mono text-xs uppercase font-bold")}>{method}</Badge>
                    <h3 className="text-xl font-bold text-[var(--veristiq-slate)] tracking-tight">{title}</h3>
               </div>
               <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-mono text-xs">{successCode}</Badge>
               </div>
            </div>
            <div className="flex items-center gap-3 font-mono text-sm bg-[var(--veristiq-snow)] p-4 rounded-lg border border-gray-100 group-hover:border-[var(--veristiq-primary-blue)]/30 transition-colors">
               <span className={cn("font-bold shrink-0", methodColorText)}>{method}</span>
               <span className="text-[var(--veristiq-slate-light)] break-all flex-1">{path}</span>
               <button 
                 onClick={copyPath}
                 className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-md transition-all shrink-0"
                 title="Copy full URL"
               >
                 {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
               </button>
            </div>
            <p className="mt-6 text-[var(--veristiq-slate-light)] leading-relaxed">{description}</p>
         </div>
         {children && <div className="p-8 bg-gray-50/50 border-t border-gray-100">{children}</div>}
      </Card>
   )
}

function CodeBlock({ code }: { code: string }) {
   const [copied, setCopied] = useState(false);

   const onCopy = () => {
       navigator.clipboard.writeText(code);
       setCopied(true);
       setTimeout(() => setCopied(false), 2000);
   }

   // Syntax highlighting for code blocks
   const highlightCode = (str: string) => {
     // Detect if it's JSON (starts with { or [)
     const isJSON = str.trim().startsWith('{') || str.trim().startsWith('[');
     
     if (isJSON) {
       return str
         // Brackets and braces (do first, before other replacements add HTML)
         .replace(/([{}[\]])/g, '<span class="text-gray-400">$1</span>')
         // Commas at end of lines
         .replace(/,(\s*\n)/g, '<span class="text-gray-400">,</span>$1')
         // Key-value pairs with string values
         .replace(/"([^"]+)":\s*"([^"]+)"/g, 
           '<span class="text-blue-400">"$1"</span><span class="text-gray-400">:</span> <span class="text-emerald-400">"$2"</span>')
         // Key-value pairs with number values
         .replace(/"([^"]+)":\s*(\d+\.?\d*)/g, 
           '<span class="text-blue-400">"$1"</span><span class="text-gray-400">:</span> <span class="text-amber-400">$2</span>')
         // Key-value pairs with boolean values
         .replace(/"([^"]+)":\s*(true|false)/g, 
           '<span class="text-blue-400">"$1"</span><span class="text-gray-400">:</span> <span class="text-purple-400">$2</span>')
         // Key-value pairs with null
         .replace(/"([^"]+)":\s*(null)/g, 
           '<span class="text-blue-400">"$1"</span><span class="text-gray-400">:</span> <span class="text-gray-500">$2</span>')
         // Key-value pairs with array/object (just style the key and colon)
         .replace(/"([^"]+)":\s*(<span class="text-gray-400">[[{]<\/span>)/g, 
           '<span class="text-blue-400">"$1"</span><span class="text-gray-400">:</span> $2')
         // Ellipsis
         .replace(/(\[\.\.\.?\])/g, '<span class="text-gray-500">$1</span>')
         // Comments (// ...)
         .replace(/(\/\/ .+)/g, '<span class="text-gray-500">$1</span>');
     }
     
     // For non-JSON (headers, curl commands, etc.) - use close/open span technique
     return '<span class="text-gray-300">' + str
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/^(curl)\b/gm, '</span><span class="text-purple-400">$1</span><span class="text-gray-300">')
       .replace(/\b(GET|POST|PUT|DELETE|PATCH)\b/g, '</span><span class="text-emerald-400">$1</span><span class="text-gray-300">')
       .replace(/(-[XH])\s/g, '</span><span class="text-amber-400">$1</span><span class="text-gray-300"> ')
       .replace(/(https?:\/\/[^\s"]+)/g, '</span><span class="text-blue-400">$1</span><span class="text-gray-300">')
       .replace(/\b(Bearer)\b/g, '</span><span class="text-purple-400">$1</span><span class="text-gray-300">')
       .replace(/(Authorization|Content-Type):/g, '</span><span class="text-blue-400">$1</span><span class="text-gray-400">:</span><span class="text-gray-300">')
       .replace(/(\\)$/gm, '</span><span class="text-gray-500">$1</span><span class="text-gray-300">')
       + '</span>';
   };

   return (
      <div className="bg-[var(--veristiq-slate)] rounded-lg p-5 overflow-x-auto shadow-inner relative group">
         <div className="absolute top-3 right-3 flex items-center gap-2">
            <button onClick={onCopy} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            </div>
         </div>
         <pre className="text-sm font-mono leading-relaxed">
            <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
         </pre>
      </div>
   )
}

function Table({ children }: { children: React.ReactNode }) {
   return (
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
         <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-[var(--veristiq-slate-light)] font-medium uppercase text-xs">
               <tr>
                  <th className="px-6 py-4 tracking-wider">Parameter</th>
                  <th className="px-6 py-4 tracking-wider">Type</th>
                  <th className="px-6 py-4 tracking-wider">Description</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
               {children}
            </tbody>
         </table>
      </div>
   )
}

function Row({ name, type, required, description }: { name: string, type: string, required?: boolean, description: string }) {
   return (
      <tr className="hover:bg-gray-50/50 transition-colors">
         <td className="px-6 py-4 font-mono text-[var(--veristiq-primary-blue)] font-medium whitespace-nowrap">
            {name}{required && <span className="text-rose-500 ml-0.5">*</span>}
         </td>
         <td className="px-6 py-4">
            <code className="text-[var(--veristiq-slate-light)] font-mono text-xs">{type}</code>
         </td>
         <td className="px-6 py-4 text-[var(--veristiq-slate-light)] leading-relaxed">{description}</td>
      </tr>
   )
}
