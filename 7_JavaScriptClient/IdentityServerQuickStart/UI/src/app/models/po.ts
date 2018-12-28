import { Nonpo } from "./nonpo";

export class Po extends Nonpo{
    "invoice_unit_price": number = null;
    "expected_tax_amount": number = null;
    "erp_commodity_id": string= "";
    "commodity_id":string= "";
}