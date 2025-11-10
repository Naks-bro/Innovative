'use client';

import { Event } from '@/lib/api';
import { AlertCircle, Mail, Globe, Monitor } from 'lucide-react';

interface EventTimelineProps {
  events: Event[];
}

export function EventTimeline({ events }: EventTimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'browser':
        return <Globe className="h-4 w-4" />;
      case 'windows':
        return <Monitor className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Recent Events</h3>
      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">No events recorded yet.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-4 rounded-md border p-4 transition-colors hover:bg-muted/50"
            >
              <div className={`rounded-full p-2 ${getRiskColor(event.riskLevel)}`}>
                {getIcon(event.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{event.action}</p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-xs font-medium ${getRiskColor(event.riskLevel)}`}>
                    {event.riskLevel}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
