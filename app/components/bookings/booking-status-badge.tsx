import { Badge } from "@/components/ui/badge";

interface BookingStatusBadgeProps {
  status: "completed" | "pending" | "cancelled" | "in-progress";
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const variants = {
    completed:
      "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20",
    pending:
      "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-amber-500/20",
    cancelled:
      "bg-red-500/15 text-red-500 hover:bg-red-500/25 border-red-500/20",
    "in-progress":
      "bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 border-blue-500/20",
  };

  return (
    <Badge variant="outline" className={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
