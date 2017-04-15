export type ServiceCode = "TR" |
                            "TI" |
                            "VA" |
                            "CS" |
                            "HB" |
                            "GT" |
                            "MP" |
                            "FP" |
                            "HP" |
                            "PP";

export type AirClassId = "first_cl" | "econom_cl" | "business_cl";

export type AirClass = "First" | "Econom" | "Business";

export type Services = "Air ticketing and reservation" |
                        "Travel insurance" |
                        "Visa assist" |
                        "Consular services" |
                        "World wide hotel booking" |
                        "Incentive group travel" |
                        "Honeymoon packages" |
                        "Family packages" |
                        "Holiday packages" |
                        "Pilgrimage packages";
export interface IOrderPort {
    // order_number?: number;
    timestamp: number;
    service: "Air ticketing and reservation" |
                "Travel insurance" |
                "Visa assist" |
                "Consular services" |
                "World wide hotel booking" |
                "Incentive group travel" |
                "Honeymoon packages" |
                "Family packages" |
                "Holiday packages" |
                "Pilgrimage packages";

    first_name: string;
    last_name: string;
    phone: string;
    adult_num?: number;
    child_num?: number;
    infant_num?: number;
    remarks?: string;
    email: string;
    destination: string;
    dep_date: string;
    arrive_date: string;
    class: "First" | "Econom" | "Business";
}