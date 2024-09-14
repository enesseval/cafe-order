import { formatDistanceToNow } from "date-fns";
import { Badge } from "./ui/badge";
import { tr } from "date-fns/locale";

export const renderStatusBadge = (status: string) => {
   switch (status) {
      case "received":
         return <Badge className="bg-blue-500 text-white">Sipariş Alındı</Badge>;
      case "preparing":
         return <Badge className="bg-yellow-500 text-black">Hazırlanıyor</Badge>;
      case "ready":
         return <Badge className="bg-green-500 text-white">Hazırlandı</Badge>;
      case "delivered":
         return <Badge className="bg-gray-500 text-white">Teslim Edildi</Badge>;
      default:
         return <Badge className="bg-red-500 text-white">Bilinmeyen Durum</Badge>;
   }
};

export const renderLastActivity = (updated_at: string) => {
   return formatDistanceToNow(new Date(updated_at), { addSuffix: true, locale: tr });
};
