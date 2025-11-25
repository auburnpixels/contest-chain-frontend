import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileJson, Code2, Lock, Server, Zap, Hash, Globe, ShieldCheck } from "lucide-react";

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600/30 font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="relative py-24 container mx-auto px-4 text-center border-b border-zinc-900/50">
         <div className="absolute inset-0 bg-blue-600/5 blur-[120px] -z-10 rounded-full pointer-events-none" />
         <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 tracking-tight">
            API Reference
         </h1>
         <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Complete documentation for the CaaS Platform REST API.
            Manage competitions, process entries, and verify results programmatically.
         </p>
         <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 px-6">
              <FileJson className="mr-2 h-4 w-4" />
              Download OpenAPI Spec
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-800 hover:bg-zinc-900 text-white rounded-full h-12 px-6">
              <Code2 className="mr-2 h-4 w-4" />
              Postman Collection
            </Button>
         </div>
      </section>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block w-64 sticky top-24 shrink-0 space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold text-white uppercase text-xs tracking-wider pl-4">Getting Started</h3>
            <ul className="space-y-1 border-l border-zinc-800">
              <li><a href="#authentication" className="block pl-4 text-zinc-400 hover:text-blue-400 hover:border-l-2 hover:border-blue-500 transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Authentication</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-white uppercase text-xs tracking-wider pl-4">Resources</h3>
            <ul className="space-y-1 border-l border-zinc-800">
              <li><a href="#competitions" className="block pl-4 text-zinc-400 hover:text-blue-400 hover:border-l-2 hover:border-blue-500 transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Competitions</a></li>
              <li><a href="#entries" className="block pl-4 text-zinc-400 hover:text-blue-400 hover:border-l-2 hover:border-blue-500 transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Entries</a></li>
              <li><a href="#draws" className="block pl-4 text-zinc-400 hover:text-blue-400 hover:border-l-2 hover:border-blue-500 transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Draws</a></li>
              <li><a href="#compliance" className="block pl-4 text-zinc-400 hover:text-blue-400 hover:border-l-2 hover:border-blue-500 transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Compliance</a></li>
              <li><a href="#webhooks" className="block pl-4 text-zinc-400 hover:text-blue-400 hover:border-l-2 hover:border-blue-500 transition-all py-1.5 text-sm -ml-px border-l-2 border-transparent">Webhooks</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-20">

          {/* Authentication */}
          <section id="authentication" className="scroll-mt-28">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Lock className="h-6 w-6" /></div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Authentication</h2>
             </div>
             <Card className="bg-zinc-950 border-zinc-900 rounded-xl overflow-hidden">
                <CardContent className="p-8 space-y-6">
                   <p className="text-zinc-400 leading-relaxed">
                      The API uses Bearer Token authentication. You must send your API key in the <code>Authorization</code> header of every request.
                   </p>
                   <div className="bg-black rounded-lg p-5 border border-zinc-900 font-mono text-sm overflow-x-auto">
                      <span className="text-purple-400">Authorization:</span> <span className="text-green-400">Bearer</span> <span className="text-zinc-300">caas_live_8923n98...</span>
                   </div>
                   <div className="flex gap-3 items-start text-sm text-amber-400 bg-amber-400/10 p-4 rounded-lg border border-amber-400/20">
                      <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.</p>
                   </div>
                </CardContent>
             </Card>
          </section>

          {/* Competitions */}
          <section id="competitions" className="scroll-mt-28">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><TrophyIcon className="h-6 w-6" /></div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Competitions</h2>
             </div>
             
             <div className="space-y-10">
                {/* POST /api/v1/operator/competitions */}
                <Endpoint 
                   method="POST" 
                   path="/api/v1/operator/competitions" 
                   title="Create Competition"
                   description="Creates a new competition instance. Returns the created competition object with a UUID."
                >
                   <Tabs defaultValue="body" className="w-full">
                      <TabsList className="bg-black border border-zinc-900 p-1 h-auto rounded-lg">
                         <TabsTrigger value="body" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-500 px-4 py-1.5 rounded-md text-sm font-medium">Request Body</TabsTrigger>
                         <TabsTrigger value="response" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-500 px-4 py-1.5 rounded-md text-sm font-medium">Response</TabsTrigger>
                      </TabsList>
                      <TabsContent value="body" className="mt-6">
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
                         <div className="mt-6">
                            <p className="text-sm text-zinc-400 mb-3 font-semibold">Example Request:</p>
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
                      <TabsContent value="response" className="mt-6">
                         <CodeBlock code={`{
  "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
  "name": "Apple Products",
  "status: "pending",
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
        {
            "id": "f6cd2555-9ca1-484e-b562-a29bf4508e11",
            "external_id": "MACBOOK",
            "title": "Macbook 2026",
            "winner": {
                "entry": {
                    "external_id": null
                }
            },
            "draw": {
                "has_been_drawn": false,
                "order": 2,
                "drawn_at": null
            }
        },
        {
            "id": "2cbe8346-614f-4af9-a6aa-57425efc68ba",
            "external_id": "IPHONE",
            "title": "iPhone 2026",
            "winner": {
                "entry": {
                    "external_id": null
                }
            },
            "draw": {
                "has_been_drawn": false,
                "order": 3,
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

                {/* GET /api/v1/operator/competitions/{external_id} */}
                <Endpoint 
                   method="GET" 
                   path="/api/v1/operator/competitions/{external_id}" 
                   title="Get Competition"
                   description="Retrieves details and current status of a competition by your external ID. Includes all prizes with their draw status."
                >
                   <Tabs defaultValue="response" className="w-full">
                      <TabsList className="bg-black border border-zinc-900 p-1 h-auto rounded-lg">
                         <TabsTrigger value="response" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-500 px-4 py-1.5 rounded-md text-sm font-medium">Response</TabsTrigger>
                      </TabsList>
                      <TabsContent value="response" className="mt-6">
                          <CodeBlock code={`{
  "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
  "name": "Apple Products",
  "status: "pending",
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
        {
            "id": "f6cd2555-9ca1-484e-b562-a29bf4508e11",
            "external_id": "MACBOOK",
            "title": "Macbook 2026",
            "winner": {
                "entry": {
                    "external_id": null
                }
            },
            "draw": {
                "has_been_drawn": false,
                "order": 2,
                "drawn_at": null
            }
        },
        {
            "id": "2cbe8346-614f-4af9-a6aa-57425efc68ba",
            "external_id": "IPHONE",
            "title": "iPhone 2026",
            "winner": {
                "entry": {
                    "external_id": null
                }
            },
            "draw": {
                "has_been_drawn": false,
                "order": 3,
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

                {/* PUT /api/v1/operator/competitions/{external_id} */}
                <Endpoint 
                   method="PUT" 
                   path="/api/v1/operator/competitions/{external_id}" 
                   title="Update Competition"
                   description="Updates an existing competition's details. Prize modifications are only allowed when status is 'pending' or 'active', and prizes that have been drawn cannot be deleted."
                >
                    <Tabs defaultValue="body" className="w-full">
                        <TabsList className="bg-black border border-zinc-900 p-1 h-auto rounded-lg">
                            <TabsTrigger value="body" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-500 px-4 py-1.5 rounded-md text-sm font-medium">Request Body</TabsTrigger>
                            <TabsTrigger value="response" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-500 px-4 py-1.5 rounded-md text-sm font-medium">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body" className="mt-6">
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
                            <div className="mt-6">
                                <p className="text-sm text-zinc-400 mb-3 font-semibold">Example Request:</p>
                                <CodeBlock code={`{
    "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
    "external_id": "SAMSUNG_PRODUCTS",
    "name": "Samsung Products",
    "max_tickets": 20000,
    "draw_at": "2026-01-01 11:00:00",
    "prizes": [
        {
            "external_id": "GALAXY_TAB_11",
            "title": "Galaxy Tab 11"
        },
        {
            "external_id": "SAMSUNG_S22",
            "title": "Samsung S22"
        }
    ]
}`} />
                            </div>
                        </TabsContent>
                        <TabsContent value="response" className="mt-6">
                            <CodeBlock code={`{
    "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
    "name": "Samsung Products",
    "status": "pending",
    "external_id": "SAMSUNG_PRODUCTS",
    "max_tickets": 20000,
    "draw_at": "2026-01-01T11:00:00.000000Z",
    "created_at": "2025-11-20T10:01:03.000000Z",
    "prizes": [
        {
            "id": "5ccb441b-e69d-4f26-8f76-7dd3049dc8ca",
            "external_id": "GALAXY_TAB_11",
            "title": "Galaxy Tab 11",
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
        {
            "id": "ace6d5a8-7e07-4783-8269-3ed8fb010a67",
            "external_id": "SAMSUNG_S22",
            "title": "Samsung S22",
            "winner": {
                "entry": {
                    "external_id": null
                }
            },
            "draw": {
                "has_been_drawn": false,
                "order": 2,
                "drawn_at": null
            }
        }
    ]
}`} />
                        </TabsContent>
                    </Tabs>
                </Endpoint>

                 {/* POST /api/v1/operator/competitions/{external_id}/publish */}
                 <Endpoint 
                   method="POST" 
                   path="/api/v1/operator/competitions/{external_id}/publish" 
                   title="Publish Competition"
                   description="Marks the competition as active and ready to accept entries."
                >
                     <CodeBlock code={`{
    "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
    "name": "Samsung Products",
    "status": "active",
    "external_id": "SAMSUNG_PRODUCTS",
    "max_tickets": 20000,
    "draw_at": "2026-01-01T11:00:00.000000Z",
    "created_at": "2025-11-20T10:01:03.000000Z",
    "prizes": [
        {
            "id": "5ccb441b-e69d-4f26-8f76-7dd3049dc8ca",
            "external_id": "GALAXY_TAB_11",
            "title": "Galaxy Tab 11",
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
        {
            "id": "ace6d5a8-7e07-4783-8269-3ed8fb010a67",
            "external_id": "SAMSUNG_S22",
            "title": "Samsung S22",
            "winner": {
                "entry": {
                    "external_id": null
                }
            },
            "draw": {
                "has_been_drawn": false,
                "order": 2,
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
                 </Endpoint>

                {/* POST /api/v1/operator/competitions/{external_id}/close */}
                 <Endpoint 
                   method="POST" 
                   path="/api/v1/operator/competitions/{external_id}/close" 
                   title="Close Competition"
                   description="Closes the competition to new entries, preparing it for the draw."
                >
                     <CodeBlock code={`{
    "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
    "name": "Samsung Products",
    "status": "awaiting_draw",
    "external_id": "SAMSUNG_PRODUCTS",
    "max_tickets": 20000,
    "draw_at": "2026-01-01T11:00:00.000000Z",
    "created_at": "2025-11-20T10:01:03.000000Z",
    "prizes": [
        {
            "id": "5ccb441b-e69d-4f26-8f76-7dd3049dc8ca",
            "external_id": "GALAXY_TAB_11",
            "title": "Galaxy Tab 11",
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
        {
            "id": "ace6d5a8-7e07-4783-8269-3ed8fb010a67",
            "external_id": "SAMSUNG_S22",
            "title": "Samsung S22",
            "winner": {
                "entry": {
                    "external_id": null
                }
            },
            "draw": {
                "has_been_drawn": false,
                "order": 2,
                "drawn_at": null
            }
        }
    ],
    "statistics": {
        "total_entries": 1,
        "paid_entries": 1,
        "free_entries": 0,
        "draws_completed": 0
    }
}`} />
                 </Endpoint>

                 {/* GET /api/v1/operator/competitions/{external_id}/stats */}
                 <Endpoint 
                   method="GET" 
                   path="/api/v1/operator/competitions/{external_id}/stats" 
                   title="Get Competition Stats"
                   description="Retrieves statistics including total entries, revenue estimates, and remaining tickets."
                />
             </div>
          </section>

          {/* Entries */}
          <section id="entries" className="scroll-mt-28">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><Hash className="h-6 w-6" /></div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Entries</h2>
             </div>

             <div className="space-y-10">
                <Endpoint 
                   method="POST" 
                   path="/api/v1/operator/competitions/{competition_external_id}/entries" 
                   title="Submit Paid Entry"
                   description="Registers a paid entry for a user. Returns the assigned ticket number(s)."
                >
                   <Table>
                      <Row name="external_id" type="string" required description="Your unique transaction/entry ID." />
                      <Row name="user_reference" type="string" description="User identifier (hashed/masked recommended for privacy)." />
                      <Row name="question_answered_correctly" type="boolean" required description="Whether the user answered the entry question correctly. Only entries with true are eligible for the draw." />
                   </Table>


                    <CodeBlock code={`{
    "id": 1f77fede-d5fc-45b3-9099-9e271f937c7a,
    "external_id": "1",
    "ticket_number": 1,
    "is_free": false,
    "user_reference": "liam@ycode.com",
    "is_eligible": true,
    "created_at": "2025-11-20T10:45:39.000000Z",
    "competition": {
        "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
        "external_id": "SAMSUNG_PRODUCTS"
    }
}`} />

                </Endpoint>

                <Endpoint 
                   method="POST" 
                   path="/api/v1/operator/competitions/{competition_external_id}/free-entries" 
                   title="Submit Free Entry"
                   description="Registers a postal or promotional entry. These are tracked separately for compliance reporting."
                >
                   <Table>
                      <Row name="external_id" type="string" required description="Your unique transaction/entry ID." />
                      <Row name="user_reference" type="string" required description="Identifier for the user submitting the free entry." />
                      <Row name="reason" type="string" description="Reason for free entry (e.g., 'postal', 'promotional', 'compensation')." />
                      <Row name="question_answered_correctly" type="boolean" required description="Whether the user answered the entry question correctly. Only entries with true are eligible for the draw." />
                   </Table>

                    <CodeBlock code={`{
    "id": "b661d1e1-b97e-4787-bcd4-76e8bba2b5d4",
    "external_id": "2",
    "ticket_number": 2,
    "is_free": true,
    "user_reference": null,
    "is_eligible": true,
    "created_at": "2025-11-20T10:48:22.000000Z",
    "competition": {
        "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
        "external_id": "SAMSUNG_PRODUCTS"
    }
}`} />
                </Endpoint>

                <Endpoint 
                   method="DELETE" 
                   path="/api/v1/operator/competitions/{competition_external_id}/entries/{entry_external_id}" 
                   title="Void Entry"
                   description="voids a previously submitted entry. This action is recorded in the audit log."
                >
                    <Tabs defaultValue="body" className="w-full">
                        <TabsList className="bg-black border border-zinc-900 p-1 h-auto rounded-lg">
                            <TabsTrigger value="body" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-500 px-4 py-1.5 rounded-md text-sm font-medium">Request Body</TabsTrigger>
                            <TabsTrigger value="response" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-500 px-4 py-1.5 rounded-md text-sm font-medium">Response</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body" className="mt-6">
                            <Table>
                                <Row name="reason" type="string" description="Reason for cancellation. Must be on off refund,cancellation,duplicate,fraud,other" />
                                <Row name="notes" type="string" description="Additional information." />
                            </Table>
                            <div className="mt-6">
                                <p className="text-sm text-zinc-400 mb-3 font-semibold">Example Request:</p>
                                <CodeBlock code={`{
    "reason": "refund",
    "notes": "Refund triggered via payment provider",
}`} />
                            </div>
                        </TabsContent>
                        <TabsContent value="response" className="mt-6">
                            <CodeBlock code={`{
    "message": "Entry deleted successfully.",
    "reason": "refund",
    "competition": {
        "id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
        "external_id": "SAMSUNG_PRODUCTS",
    },
    "entry": {
        "id": "b661d1e1-b97e-4787-bcd4-76e8bba2b5d4",
        "external_id": "2",
    }
}`} />
                        </TabsContent>
                    </Tabs>
                </Endpoint>
             </div>
          </section>

          {/* Draws */}
          <section id="draws" className="scroll-mt-28">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Zap className="h-6 w-6" /></div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Draws</h2>
             </div>

             <div className="space-y-10">
                <Endpoint 
                   method="POST" 
                   path="/api/v1/operator/competitions/{competition_external_id}/draws/run" 
                   title="Trigger Draw"
                   description="Initiates the CSPRNG draw process. You can draw a specific prize or all undrawn prizes at once. When drawing all prizes, previous winners are automatically excluded from subsequent prize draws."
                >
                    <CodeBlock code={`{
    "success": true,
    "competition_id": "956774e8-9835-4c54-9eb2-ce099db4e5f0",
    "competition_external_id": "SAMSUNG_PRODUCTS",
    "total_prizes_drawn": 2,
    "draws": [
        {
            "id": null,
            "drawn_at": "2025-11-20T11:25:24.000000Z",
            "total_entries": 1,
            "signature_hash": "71b4d0f1d3e8f145b60d37f1bf2b7d7c5985bc59d408143ff4a49a969a5b5511",
            "prize": {
                "id": "5ccb441b-e69d-4f26-8f76-7dd3049dc8ca",
                "external_id": "GALAXY_TAB_11",
                "title": "Galaxy Tab 11"
            },
            "winner": {
                "entry": {
                    "id": null,
                    "external_id": "1",
                    "number": 1
                }
            }
        },
        {
            "id": null,
            "drawn_at": "2025-11-20T11:25:24.000000Z",
            "total_entries": 0,
            "signature_hash": "c65d65ac7cbdc45c8c271a7261562d7adbd2ba9da7a5694716912e2f961531e7",
            "prize": {
                "id": "ace6d5a8-7e07-4783-8269-3ed8fb010a67",
                "external_id": "SAMSUNG_S22",
                "title": "Samsung S22"
            },
            "winner": {
                "entry": {
                    "id": null,
                    "external_id": null,
                    "number": null
                }
            }
        }
    ],
    "audit_url": "http://localhost:8000/api/v1/raffles/956774e8-9835-4c54-9eb2-ce099db4e5f0/audit"
}`} />
                </Endpoint>
                
                <Endpoint 
                   method="GET" 
                   path="/api/v1/operator/competitions/{competition_external_id}/audits" 
                   title="Get Audit Logs"
                   description="Retrieves the full cryptographic audit chain and event history for a competition. Each prize draw creates its own audit record linked to the global audit chain."
                >
                   <Tabs defaultValue="response" className="w-full">
                      <TabsList className="bg-black border border-zinc-900 p-1 h-auto rounded-lg">
                         <TabsTrigger value="response" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white text-zinc-500 px-4 py-1.5 rounded-md text-sm font-medium">Response</TabsTrigger>
                      </TabsList>
                      <TabsContent value="response" className="mt-6">
                         <CodeBlock code={`{
  "competition_id": "CHRISTMAS2025",
  "total_draws": 3,
  "audits": [
    {
      "draw_id": "draw_abc123...",
      "prize_id": "GRAND_PRIZE",
      "prize_title": "iPad Pro",
      "drawn_at_utc": "2025-12-25T12:05:23.000000Z",
      "total_entries": 856,
      "winner_entry_id": "entry_789",
      "winner_ticket_number": 4567,
      "rng_seed_hash": "a3f8d9e2...",
      "signature_hash": "a3f8d9e2...",
      "previous_signature_hash": "f2a8c9d4...",
      "pool_hash": "d4f2a8c9..."
    },
    {
      "draw_id": "draw_def456...",
      "prize_id": "SECOND_PRIZE",
      "prize_title": "AirPods Max",
      "drawn_at_utc": "2025-12-25T12:05:24.000000Z",
      "total_entries": 855,
      "winner_entry_id": "entry_321",
      "winner_ticket_number": 1234,
      "rng_seed_hash": "b7c2e4f1...",
      "signature_hash": "b7c2e4f1...",
      "previous_signature_hash": "a3f8d9e2...",
      "pool_hash": "e5g3b9e5..."
    }
  ]
}`} />
                      </TabsContent>
                   </Tabs>
                </Endpoint>
             </div>
          </section>

          {/* Compliance */}
          <section id="compliance" className="scroll-mt-28">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><ShieldCheck className="h-6 w-6" /></div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Compliance</h2>
             </div>

             <div className="space-y-10">
                <Endpoint 
                   method="GET" 
                   path="/api/v1/operator/compliance" 
                   title="Get Compliance Summary"
                   description="Retrieves your current compliance score and any outstanding requirements."
                />
                 <Endpoint 
                   method="POST" 
                   path="/api/v1/operator/complaints" 
                   title="Log Complaint"
                   description="Log a user complaint for regulatory tracking and resolution."
                >
                   <Table>
                      <Row name="competition_id" type="string" required description="External ID of the related competition." />
                      <Row name="user_reference" type="string" required description="User raising the complaint." />
                      <Row name="description" type="text" required description="Details of the complaint." />
                   </Table>
                </Endpoint>
             </div>
          </section>
          
          {/* Webhooks */}
          <section id="webhooks" className="scroll-mt-28">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500"><Server className="h-6 w-6" /></div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Webhooks</h2>
             </div>
             
             <div className="space-y-10">
                <Endpoint 
                   method="POST" 
                   path="/api/v1/operator/webhooks" 
                   title="Create Subscription"
                   description="Subscribe to platform events such as 'draw.completed' or 'audit.generated'."
                >
                   <Table>
                      <Row name="url" type="url" required description="HTTPS endpoint to receive payloads." />
                      <Row name="events" type="array" required description="List of event types to subscribe to (e.g., ['draw.completed'])." />
                   </Table>
                </Endpoint>

                <Endpoint 
                   method="GET" 
                   path="/api/v1/operator/webhooks" 
                   title="List Webhooks"
                   description="List all active webhook subscriptions."
                />
             </div>
          </section>

        </main>
      </div>

      <SiteFooter />
    </div>
  );
}

// Helper Components
function TrophyIcon(props: any) {
    return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    );
}

function Endpoint({ method, path, title, description, children }: { method: string, path: string, title: string, description: string, children?: React.ReactNode }) {
   const color = method === "POST" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                : method === "GET" ? "bg-green-500/10 text-green-400 border-green-500/20"
                : method === "DELETE" ? "bg-red-500/10 text-red-400 border-red-500/20"
                : method === "PUT" ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "bg-zinc-500/10 text-zinc-400";
   
   const methodColorText = method === "POST" ? "text-blue-500" 
                : method === "GET" ? "text-green-500"
                : method === "DELETE" ? "text-red-500"
                : method === "PUT" ? "text-amber-500"
                : "text-zinc-400";

   return (
      <Card className="bg-zinc-950 border-zinc-900 overflow-hidden hover:border-zinc-800 transition-colors rounded-xl">
         <div className="p-8 border-b border-zinc-900 bg-zinc-950/50">
            <div className="flex items-center justify-between mb-5">
               <h3 className="text-xl font-semibold text-white tracking-tight">{title}</h3>
               <Badge variant="outline" className={`${color} border px-3 py-1 rounded-md font-mono text-xs uppercase font-bold`}>{method}</Badge>
            </div>
            <div className="flex items-center gap-3 font-mono text-sm bg-black p-4 rounded-lg border border-zinc-900">
               <span className={`font-bold ${methodColorText}`}>{method}</span>
               <span className="text-zinc-300 break-all">{path}</span>
            </div>
            <p className="mt-6 text-zinc-400 leading-relaxed">{description}</p>
         </div>
         {children && <div className="p-8 bg-black/30 border-t border-zinc-900">{children}</div>}
      </Card>
   )
}

function CodeBlock({ code }: { code: string }) {
   return (
      <div className="bg-black rounded-lg border border-zinc-900 p-5 overflow-x-auto">
         <pre className="text-sm font-mono text-zinc-300 leading-relaxed">
            <code>{code}</code>
         </pre>
      </div>
   )
}

function Table({ children }: { children: React.ReactNode }) {
   return (
      <div className="border border-zinc-900 rounded-lg overflow-hidden">
         <table className="w-full text-sm text-left">
            <thead className="bg-zinc-900 text-zinc-400 font-medium uppercase text-xs">
               <tr>
                  <th className="px-6 py-4 tracking-wider">Parameter</th>
                  <th className="px-6 py-4 tracking-wider">Type</th>
                  <th className="px-6 py-4 tracking-wider">Description</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 bg-black">
               {children}
            </tbody>
         </table>
      </div>
   )
}

function Row({ name, type, required, description }: { name: string, type: string, required?: boolean, description: string }) {
   return (
      <tr>
         <td className="px-6 py-4 font-mono text-blue-400 font-medium">
            {name} {required && <span className="text-red-500 ml-1" title="Required">*</span>}
         </td>
         <td className="px-6 py-4 text-purple-400 font-mono text-xs">{type}</td>
         <td className="px-6 py-4 text-zinc-400 leading-relaxed">{description}</td>
      </tr>
   )
}
