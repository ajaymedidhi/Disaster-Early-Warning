import { ShieldAlert, Route, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import * as React from "react";

const mockEvacuations = [
  { id: "e1", locality: "Majuli Island (North Bank)", population: 4500, vulnerability: "High (Elderly + 2 Hospitals)", capacity: "Low (Boats only)", score: 95, status: "Pending" },
  { id: "e2", locality: "Kaziranga Settlement A", population: 1200, vulnerability: "Medium", capacity: "Medium (1 Bridge left)", score: 72, status: "In Progress" },
  { id: "e3", locality: "Brahmaputra Valley Sector 4", population: 8500, vulnerability: "Low", capacity: "High (Multiple roads)", score: 45, status: "Resolved" },
];

export default function Evacuation() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide text-slate-800 dark:text-slate-100">Evacuation Priority Ranker</h2>
          <p className="text-sm text-slate-500">Live ranking based on hazard severity × exposure × vulnerability</p>
        </div>
        <Button className="rounded-none uppercase tracking-wider font-bold text-xs bg-red-600 hover:bg-red-700 text-white border-0">
          <ShieldAlert className="w-4 h-4 mr-2" />
          Trigger General Evacuation
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockEvacuations.map((evac, idx) => (
          <Card key={evac.id} className="rounded-none border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-none">
            <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-12 h-12 border ${
                  idx === 0 ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/30 dark:border-red-900' : 
                  idx === 1 ? 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-950/30 dark:border-amber-900' : 
                  'bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-800'
                }`}>
                  <span className="text-xl font-bold">#{idx + 1}</span>
                </div>
                
                <div>
                  <h3 className="font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">{evac.locality}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><UsersIcon className="w-3 h-3"/> POP: {evac.population.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> VULN: {evac.vulnerability}</span>
                    <span className="flex items-center gap-1"><Route className="w-3 h-3"/> CAP: {evac.capacity}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block">Priority Score</span>
                    <span className={`text-2xl font-bold ${evac.score > 80 ? 'text-red-600' : evac.score > 50 ? 'text-amber-600' : 'text-slate-600 dark:text-slate-400'}`}>
                      {evac.score}
                    </span>
                  </div>
                  <Badge variant="outline" className={`rounded-none uppercase text-[10px] font-bold ${
                    evac.status === 'Pending' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400' :
                    evac.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {evac.status}
                  </Badge>
                </div>
                {evac.status !== 'Resolved' && (
                  <Button variant="outline" size="sm" className="rounded-none text-xs uppercase tracking-wider font-bold bg-transparent border-slate-300 dark:border-slate-700">
                    Assign Route
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )
}
