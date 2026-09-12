import { FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const mockReports = [
  { id: "r1", title: "SitRep - 12:00 Hrs", date: "Sep 12, 2026", type: "Situation Report", size: "2.4 MB" },
  { id: "r2", title: "Resource Gap Analysis", date: "Sep 12, 2026", type: "Analytics", size: "1.1 MB" },
  { id: "r3", title: "End of Day Summary", date: "Sep 11, 2026", type: "Summary", size: "3.5 MB" },
];

export default function Reports() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wide text-slate-800 dark:text-slate-100">Situation Reports</h2>
          <p className="text-sm text-slate-500">Auto-generated platform summaries and exportable documents</p>
        </div>
        <Button className="rounded-none uppercase tracking-wider font-bold text-xs bg-primary hover:bg-primary/90 text-white border-0">
          <FileText className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-none border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-none col-span-1 md:col-span-2">
           <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-3 border-b border-slate-200 dark:border-slate-800 p-4">
              <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                Latest Compiled Reports
              </CardTitle>
           </CardHeader>
           <CardContent className="p-0">
             <div className="divide-y divide-slate-200 dark:divide-slate-800">
               {mockReports.map((report) => (
                 <div key={report.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                       <FileText className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900 dark:text-slate-100">{report.title}</h4>
                       <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">
                         <span>{report.date}</span>
                         <span>•</span>
                         <span>{report.type}</span>
                       </div>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="text-xs font-mono text-slate-400">{report.size}</span>
                     <Button variant="outline" size="sm" className="rounded-none uppercase text-[10px] tracking-widest font-bold border-slate-300 dark:border-slate-700">
                       <Download className="w-3 h-3 mr-2" />
                       Download
                     </Button>
                   </div>
                 </div>
               ))}
             </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
