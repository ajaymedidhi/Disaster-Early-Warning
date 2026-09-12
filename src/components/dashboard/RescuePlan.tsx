import { Truck, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const mockDispatch = [
  { id: "d1", team: "NDRF Battalion 4", asset: "6 Swift Water Boats", destination: "Majuli Island (North Bank)", status: "En Route", eta: "14 mins", assignedTo: "e1" },
  { id: "d2", team: "State Disaster Response Force", asset: "Heavy Earth Movers", destination: "Wayanad Sector B", status: "Arrived", eta: "0 mins", assignedTo: "l1" },
  { id: "d3", team: "Air Force Heli-Rescue", asset: "Mi-17V5", destination: "Kaziranga Settlement A", status: "Preparing", eta: "45 mins", assignedTo: "e2" },
];

export default function RescuePlan() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide text-slate-800 dark:text-slate-100">Rescue Plan & Dispatch</h2>
          <p className="text-sm text-slate-500">Resource allocation and optimized routing assignments</p>
        </div>
        <Button className="rounded-none uppercase tracking-wider font-bold text-xs bg-primary hover:bg-primary/90 text-white border-0">
          <Truck className="w-4 h-4 mr-2" />
          Dispatch All Pending
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDispatch.map((dispatch) => (
          <Card key={dispatch.id} className="rounded-none border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-none flex flex-col">
            <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-3 border-b border-slate-200 dark:border-slate-800 p-4">
              <CardTitle className="text-sm font-bold uppercase tracking-wide flex justify-between items-center">
                <span>{dispatch.team}</span>
                <Badge variant="outline" className={`rounded-none text-[9px] uppercase tracking-widest ${
                    dispatch.status === 'En Route' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    dispatch.status === 'Arrived' ? 'bg-green-50 text-green-700 border-green-200' :
                    'bg-slate-100 text-slate-700 border-slate-300'
                }`}>
                  {dispatch.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Asset</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{dispatch.asset}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Destination</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{dispatch.destination}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">ETA</span>
                  <span className="font-bold text-primary flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {dispatch.eta}
                  </span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full rounded-none uppercase tracking-widest text-xs font-bold border-slate-300 dark:border-slate-700">
                View Optimized Route
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
