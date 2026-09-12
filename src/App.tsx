import { useState } from "react"
import { ShieldAlert, Activity, Map as MapIcon, Route, Users, FileText } from "lucide-react"

import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { hazards, mockZones, mockAlerts, type HazardType } from "./data/mockApi"
import MapView from "./components/dashboard/MapView"
import Evacuation from "./components/dashboard/Evacuation"
import RescuePlan from "./components/dashboard/RescuePlan"
import Reports from "./components/dashboard/Reports"

type Tab = "Dashboard" | "Risk Map" | "Evacuation" | "Rescue Plan" | "Reports";

function App() {
  const [selectedHazard, setSelectedHazard] = useState<HazardType>("Floods")
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard")
  
  const currentZones = mockZones[selectedHazard] || []

  const renderContent = () => {
    switch (activeTab) {
      case "Evacuation":
        return <Evacuation />;
      case "Rescue Plan":
        return <RescuePlan />;
      case "Reports":
        return <Reports />;
      case "Risk Map":
      case "Dashboard":
      default:
        return (
          <>
            {/* Hazard Selector */}
            <div className="flex flex-wrap gap-2">
              {hazards.map((hazard) => (
                <Button
                  key={hazard}
                  variant={selectedHazard === hazard ? "default" : "outline"}
                  className={`rounded-none font-semibold text-xs tracking-wider uppercase border-slate-300 dark:border-slate-700 ${
                    selectedHazard === hazard 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                  onClick={() => setSelectedHazard(hazard)}
                >
                  {hazard}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
              
              {/* Map Area */}
              <Card className="lg:col-span-2 flex flex-col rounded-none border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-none">
                <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-3 border-b border-slate-200 dark:border-slate-800 p-4">
                  <CardTitle className="flex items-center justify-between text-sm font-bold uppercase tracking-wide">
                    <span className="flex items-center gap-2">
                       <MapIcon className="w-4 h-4 text-slate-500" /> 
                       Risk Map: <span className="text-primary">{selectedHazard}</span>
                    </span>
                    <div className="flex gap-4 text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-500"></span> HIGH</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500"></span> MEDIUM</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-slate-400"></span> LOW</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 relative min-h-[400px] z-0">
                   <MapView zones={currentZones} />
                </CardContent>
              </Card>

              {/* Sidebar Panels */}
              <div className="flex flex-col gap-6">
                
                {/* Active Alerts */}
                <Card className="rounded-none border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-none">
                  <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-3 border-b border-slate-200 dark:border-slate-800 p-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                      <Activity className="w-4 h-4 text-red-500" />
                      Priority Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4">
                    {mockAlerts.map(alert => (
                      <div key={alert.id} className="flex flex-col gap-2 p-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                          <Badge variant={alert.severity === 'severe' ? 'destructive' : 'secondary'} className={`rounded-none text-[9px] uppercase tracking-widest font-bold ${alert.severity === 'severe' ? 'bg-red-600' : ''}`}>
                            {alert.severity}
                          </Badge>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{alert.timestamp}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">{alert.message}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Zone List */}
                <Card className="flex-1 flex flex-col rounded-none border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-none">
                  <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-3 border-b border-slate-200 dark:border-slate-800 p-4">
                    <CardTitle className="text-sm font-bold uppercase tracking-wide">Affected Zones</CardTitle>
                    <CardDescription className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Ranked by {selectedHazard} risk</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto p-0">
                    {currentZones.map((zone, index) => (
                      <div key={zone.id} className={`p-4 border-b border-slate-100 dark:border-slate-800 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer ${index === currentZones.length - 1 ? 'border-b-0' : ''}`}>
                        <div className="mt-1 flex-shrink-0">
                          <span className={`w-3 h-3 block ${
                            zone.riskLevel === 'High' ? 'bg-red-500' :
                            zone.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-slate-400'
                          }`}></span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-wide uppercase">{zone.name}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{zone.basis}</p>
                        </div>
                      </div>
                    ))}
                    {currentZones.length === 0 && (
                       <div className="text-center text-sm text-slate-500 py-12 uppercase tracking-wide font-semibold">
                         No active zones reported.
                       </div>
                    )}
                  </CardContent>
                </Card>

              </div>
            </div>
          </>
        );
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans text-slate-900 dark:text-slate-100">
      
      {/* Sidebar - Flat & Solid */}
      <div className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-primary" />
          <h1 className="font-bold text-lg tracking-tight uppercase">Sentinel Grid</h1>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavItem icon={<Activity className="w-4 h-4" />} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} />
          <NavItem icon={<MapIcon className="w-4 h-4" />} label="Risk Map" active={activeTab === "Risk Map"} onClick={() => setActiveTab("Risk Map")} />
          <NavItem icon={<Route className="w-4 h-4" />} label="Evacuation" active={activeTab === "Evacuation"} onClick={() => setActiveTab("Evacuation")} />
          <NavItem icon={<Users className="w-4 h-4" />} label="Rescue Plan" active={activeTab === "Rescue Plan"} onClick={() => setActiveTab("Rescue Plan")} />
          <NavItem icon={<FileText className="w-4 h-4" />} label="Reports" active={activeTab === "Reports"} onClick={() => setActiveTab("Reports")} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-100 dark:bg-slate-900">
        
        {/* Header - Flat & Solid */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center px-6 shadow-sm z-10 justify-between">
          <h2 className="font-semibold text-base tracking-wide uppercase text-slate-600 dark:text-slate-300">Live Intelligence Dashboard / {activeTab}</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            LIVE STREAM ACTIVE
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6 flex flex-col gap-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition-none border-l-4 ${
        active 
          ? 'bg-primary/10 text-primary border-primary' 
          : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
      }`}>
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default App
