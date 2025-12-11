"use client";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileJson, Code2, Lock, Server, Zap, Hash, ShieldCheck, Trophy, ArrowRight, ChevronRight, Scale, Copy, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--veristiq-slate)]">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[var(--veristiq-slate)] text-white overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
         
         <div className="container mx-auto px-6 text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-8 backdrop-blur-sm shadow-lg ring-1 ring-white/20">
                <Code2 className="w-8 h-8 text-[var(--veristiq-teal)]" />
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
                 <Zap className="mr-2 h-4 w-4" />
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
            </ul>
          </div>
          
          <div className="space-y-6">
            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Competitions
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <li><a href="#create-competition" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">POST</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Create competition</span></a></li>
                    <li><a href="#get-competition" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">GET</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Get competition</span></a></li>
                    <li><a href="#update-competition" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">PUT</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Update competition</span></a></li>
                    <li><a href="#close-competition" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">POST</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Close competition</span></a></li>
                    <li><a href="#get-competition-stats" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">GET</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Get stats</span></a></li>
                </ul>
            </div>
            
            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Entries
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <li><a href="#submit-entry" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">POST</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Submit entry</span></a></li>
                    <li><a href="#submit-free-entry" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">POST</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Submit free entry</span></a></li>
                    <li><a href="#void-entry" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">DELETE</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Void entry</span></a></li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Draws
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <li><a href="#trigger-draw" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">POST</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Trigger draw</span></a></li>
                    <li><a href="#get-audits" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">GET</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Get audit logs</span></a></li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Compliance
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <li><a href="#get-compliance" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">GET</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Get compliance</span></a></li>
                    <li><a href="#log-complaint" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">POST</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Log complaint</span></a></li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-[var(--veristiq-slate)] uppercase text-xs tracking-wider pl-4 mb-3">
                    Webhooks
                </h3>
                <ul className="space-y-1 border-l border-gray-200">
                    <li><a href="#create-webhook" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">POST</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">Create webhook</span></a></li>
                    <li><a href="#list-webhooks" className="group block pl-4 py-1.5 text-sm -ml-px border-l-2 border-transparent hover:border-[var(--veristiq-primary-blue)] transition-all"><Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0.5">GET</Badge><span className="text-[var(--veristiq-slate-light)] group-hover:text-[var(--veristiq-primary-blue)] truncate">List webhooks</span></a></li>
                </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">

          {/* Authentication */}
          <section id="authentication" className="scroll-mt-32">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 rounded-lg text-[var(--veristiq-primary-blue)]"><Lock className="h-6 w-6" /></div>
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Authentication</h2>
             </div>
             <Card className="bg-white border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 space-y-6">
                   <p className="text-[var(--veristiq-slate-light)] leading-relaxed text-lg">
                      The API uses Bearer Token authentication. You must send your API key in the <code>Authorization</code> header of every request.
                   </p>
                   <div className="bg-[var(--veristiq-slate)] rounded-lg p-5 border border-[var(--veristiq-slate-light)] font-mono text-sm overflow-x-auto shadow-inner">
                      <span className="text-purple-300">Authorization:</span> <span className="text-[var(--veristiq-teal)]">Bearer</span> <span className="text-gray-400">caas_live_8923n98...</span>
                   </div>
                   <div className="flex gap-4 items-start text-sm text-amber-800 bg-amber-50 p-6 rounded-lg border border-amber-100">
                      <Lock className="h-5 w-5 mt-0.5 flex-shrink-0 text-amber-500" />
                      <p className="leading-relaxed">Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.</p>
                   </div>
                </CardContent>
             </Card>
          </section>

          {/* Competitions */}
          <section id="competitions" className="scroll-mt-32">
             <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 rounded-lg text-[var(--veristiq-primary-blue)]"><Trophy className="h-6 w-6" /></div>
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
                    >
                    <Tabs defaultValue="body" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="body" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Request Body</TabsTrigger>
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body">
                            <Table>
                                <Row name="external_id" type="string" required description="Your unique identifier for this competition (e.g., 'comp_123')." />
                                <Row name="name" type="string" required description="Public name/title of the competition." />
                                <Row name="max_tickets" type="integer" required description="Total available tickets." />
                                <Row name="draw_at" type="timestamp" required description="Scheduled draw time (ISO 8601 format)." />
                                <Row name="status" type="string" description="Initial status (default: 'pending'). Options: pending, active." />
                                <Row name="prizes" type="array" required description="Array of prizes for this competition (minimum 1 prize required)." />
                                <Row name="prizes[].external_id" type="string" required description="Your unique identifier for this prize within the competition." />
                                <Row name="prizes[].name" type="string" required description="Name/title of the prize." />
                            </Table>
                            <div className="mt-8">
                                <p className="text-sm text-[var(--veristiq-slate)] mb-3 font-semibold flex items-center gap-2"><Code2 className="w-4 h-4" /> Example Request</p>
                                <CodeBlock code={`{
    "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
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
        },
        // ... more prizes
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
    // ... competition details
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
                                    <Row name="external_id" type="string" description="Update the external identifier." />
                                    <Row name="name" type="string" description="Update the public name/title." />
                                    <Row name="max_tickets" type="integer" description="Update the total ticket quantity." />
                                    <Row name="draw_at" type="timestamp" description="Reschedule the draw time." />
                                    <Row name="status" type="string" description="Update the status (pending, active, ended, closed, awaiting_draw, completed)." />
                                    <Row name="prizes" type="array" description="Update prizes array. You can add new prizes, update existing ones, or remove undrawn prizes." />
                                    <Row name="prizes[].external_prize_id" type="string" description="Prize identifier (required when prizes array is provided)." />
                                    <Row name="prizes[].name" type="string" description="Prize title (required when prizes array is provided)." />
                                </Table>
                                <div className="mt-8">
                                    <p className="text-sm text-[var(--veristiq-slate)] mb-3 font-semibold flex items-center gap-2"><Code2 className="w-4 h-4" /> Example Request</p>
                                    <CodeBlock code={`{
        "external_id": "SAMSUNG_PRODUCTS",
        "name": "Samsung Products",
        "max_tickets": 20000,
        "draw_at": "2026-01-01 11:00:00",
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
        // ... updated fields
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
        // ...
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
        "revenue_estimated": 12500.00,
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
             <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 rounded-lg text-[var(--veristiq-primary-blue)]"><Hash className="h-6 w-6" /></div>
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Entries</h2>
             </div>

             <div className="space-y-12">
                <div id="submit-entry" className="scroll-mt-32">
                    <Endpoint 
                    method="POST" 
                    path="/api/v1/operator/competitions/{competition_external_id}/entries" 
                    title="Submit Paid Entry"
                    description="Registers a paid entry for a user. Returns the assigned ticket number(s)."
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
                                <Row name="question_answered_correctly" type="boolean" required description="Whether the user answered the entry question correctly. Only entries with true are eligible for the draw." />
                            </Table>
                        </TabsContent>
                        <TabsContent value="response">
                            <div className="mt-8">
                                <p className="text-sm text-[var(--veristiq-slate)] mb-3 font-semibold flex items-center gap-2"><Code2 className="w-4 h-4" /> Example Response</p>
                                <CodeBlock code={`{
            "id": "1f77fede-d5fc-45b3-9099-9e271f937c7a",
            "external_id": "1",
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
                            </div>
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
                                <Row name="reason" type="string" description="Reason for free entry (e.g., 'postal', 'promotional', 'compensation')." />
                                <Row name="question_answered_correctly" type="boolean" required description="Whether the user answered the entry question correctly. Only entries with true are eligible for the draw." />
                            </Table>
                        </TabsContent>
                        <TabsContent value="response">
                            <CodeBlock code={`{
    "id": "b661d1e1-b97e-4787-bcd4-76e8bba2b5d4",
    "external_id": "postal_001",
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
                                    <Row name="reason" type="string" description="Reason for cancellation. Must be one of: refund, cancellation, duplicate, fraud, other" />
                                    <Row name="notes" type="string" description="Additional information." />
                                </Table>
                            </TabsContent>
                            <TabsContent value="response">
                                <CodeBlock code={`{
        "message": "Entry deleted successfully.",
        "reason": "refund",
        "competition": { ... },
        "entry": { ... }
    }`} />
                            </TabsContent>
                        </Tabs>
                    </Endpoint>
                </div>
             </div>
          </section>

          {/* Draws */}
          <section id="draws" className="scroll-mt-32">
             <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 rounded-lg text-[var(--veristiq-primary-blue)]"><Zap className="h-6 w-6" /></div>
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
                            <div className="mt-6">
                                <CodeBlock code={`{
            "success": true,
            "competition_id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
            "total_prizes_drawn": 2,
            "draws": [
                {
                    "id": "...",
                    "drawn_at": "2025-11-20T11:25:24.000000Z",
                    "signature_hash": "71b4d0f1d3e8f145b60d37f1bf2b7d7c5985bc59d408143ff4a49a969a5b5511",
                    "prize": { "title": "Galaxy Tab 11" },
                    "winner": { "entry": { "number": 1 } }
                }
            ],
            "audit_url": "https://veristiq.io/audit/956774e8..."
        }`} />
                            </div>
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
        "draw_id": "draw_abc123...",
        "prize_id": "GRAND_PRIZE",
        "rng_seed_hash": "a3f8d9e2...",
        "signature_hash": "a3f8d9e2...",
        "previous_signature_hash": "f2a8c9d4...",
        "pool_hash": "d4f2a8c9..."
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
             <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 rounded-lg text-[var(--veristiq-primary-blue)]"><ShieldCheck className="h-6 w-6" /></div>
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
                <div id="log-complaint" className="scroll-mt-32">
                    <Endpoint 
                    method="POST" 
                    path="/api/v1/operator/complaints" 
                    title="Log Complaint"
                    description="Log a user complaint for regulatory tracking and resolution."
                    >
                    <Tabs defaultValue="body" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="body" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Request Body</TabsTrigger>
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body">
                            <Table>
                                <Row name="competition_id" type="string" required description="External ID of the related competition." />
                                <Row name="user_reference" type="string" required description="User raising the complaint." />
                                <Row name="description" type="text" required description="Details of the complaint." />
                            </Table>
                        </TabsContent>
                        <TabsContent value="response">
                            <CodeBlock code={`{
    "id": "complaint_789",
    "status": "logged",
    "created_at": "2025-11-20T12:00:00.000000Z",
    "tracking_reference": "CMP-2025-789"
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>
             </div>
          </section>
          
          {/* Webhooks */}
          <section id="webhooks" className="scroll-mt-32">
             <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 rounded-lg text-[var(--veristiq-primary-blue)]"><Server className="h-6 w-6" /></div>
                <h2 className="text-3xl font-bold text-[var(--veristiq-slate)] tracking-tight">Webhooks</h2>
             </div>
             
             <div className="space-y-12">
                <div id="create-webhook" className="scroll-mt-32">
                    <Endpoint 
                    method="POST" 
                    path="/api/v1/operator/webhooks" 
                    title="Create Subscription"
                    description="Subscribe to platform events such as 'draw.completed' or 'audit.generated'."
                    >
                    <Tabs defaultValue="body" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="body" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Request Body</TabsTrigger>
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body">
                            <Table>
                                <Row name="url" type="url" required description="HTTPS endpoint to receive payloads." />
                                <Row name="events" type="array" required description="List of event types to subscribe to (e.g., ['draw.completed'])." />
                            </Table>
                        </TabsContent>
                        <TabsContent value="response">
                            <CodeBlock code={`{
    "id": "wh_123",
    "url": "https://yourapp.com/webhooks",
    "events": ["draw.completed"],
    "created_at": "2025-11-20T10:00:00Z"
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>

                <div id="list-webhooks" className="scroll-mt-32">
                    <Endpoint 
                    method="GET" 
                    path="/api/v1/operator/webhooks" 
                    title="List Webhooks"
                    description="List all active webhook subscriptions."
                    >
                    <Tabs defaultValue="response" className="w-full">
                        <TabsList className="bg-gray-100 p-1 h-auto rounded-lg mb-6">
                            <TabsTrigger value="response" className="data-[state=active]:bg-white data-[state=active]:text-[var(--veristiq-primary-blue)] data-[state=active]:shadow-sm text-gray-500 px-4 py-2 rounded-md text-sm font-medium transition-all">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="response">
                            <CodeBlock code={`{
    "data": [
        {
            "id": "wh_123",
            "url": "https://yourapp.com/webhooks",
            "events": ["draw.completed"],
            "created_at": "2025-11-20T10:00:00Z"
        }
    ]
}`} />
                        </TabsContent>
                    </Tabs>
                    </Endpoint>
                </div>
             </div>
          </section>

        </main>
      </div>

      <SiteFooter />
    </div>
  );
}

// Helper Components
function Endpoint({ method, path, title, description, children }: { method: string, path: string, title: string, description: string, children?: React.ReactNode }) {
   const badgeStyles = method === "POST" ? "bg-blue-100 text-blue-700 border-blue-200" 
                : method === "GET" ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : method === "DELETE" ? "bg-rose-100 text-rose-700 border-rose-200"
                : method === "PUT" ? "bg-amber-100 text-amber-700 border-amber-200"
                : "bg-gray-100 text-gray-700 border-gray-200";
   
   const methodColorText = method === "POST" ? "text-blue-600" 
                : method === "GET" ? "text-emerald-600"
                : method === "DELETE" ? "text-rose-600"
                : method === "PUT" ? "text-amber-600"
                : "text-gray-500";

   return (
      <Card className="bg-white border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-xl group">
         <div className="p-8 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-5">
               <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`${badgeStyles} border px-3 py-1 rounded-md font-mono text-xs uppercase font-bold`}>{method}</Badge>
                    <h3 className="text-xl font-bold text-[var(--veristiq-slate)] tracking-tight">{title}</h3>
               </div>
            </div>
            <div className="flex items-center gap-3 font-mono text-sm bg-[var(--veristiq-snow)] p-4 rounded-lg border border-gray-100 group-hover:border-[var(--veristiq-primary-blue)]/30 transition-colors">
               <span className={`font-bold ${methodColorText}`}>{method}</span>
               <span className="text-[var(--veristiq-slate-light)] break-all">{path}</span>
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

   return (
      <div className="bg-[var(--veristiq-slate)] rounded-lg border border-[var(--veristiq-slate-light)] p-5 overflow-x-auto shadow-inner relative group">
         <div className="absolute top-3 right-3 flex items-center gap-2">
            <button onClick={onCopy} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
         </div>
         <pre className="text-sm font-mono text-gray-300 leading-relaxed">
            <code>{code}</code>
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
      <tr>
         <td className="px-6 py-4 font-mono text-[var(--veristiq-primary-blue)] font-medium">
            {name} {required && <span className="text-red-500 ml-1" title="Required">*</span>}
         </td>
         <td className="px-6 py-4 text-purple-600 font-mono text-xs bg-purple-50/50 rounded-md w-fit px-2 py-1 h-fit my-auto inline-block mx-6 mt-4">{type}</td>
         <td className="px-6 py-4 text-[var(--veristiq-slate-light)] leading-relaxed">{description}</td>
      </tr>
   )
}
