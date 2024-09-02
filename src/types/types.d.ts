import { Foods } from "@/gql/graphql";

type User = {
   id?: string;
   username: string | null; // `string | null` olarak güncellendi
   password?: string;
   role: string; // Burada role için uygun bir tür belirtmeniz önerilir
};

type clerKFunctionsResult = {
   success: boolean;
   message?: string;
};

type Table = {
   id: string;
   table_name: string;
};
