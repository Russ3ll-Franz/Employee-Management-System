import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { ConfirmationEdit } from "./customer-list/confirmation/confirmation-edit.component";
import { ExpansionComponent } from "./customer-list/expand/expansion.component";

const customerRoutes: Routes = [

    { path: 'customer', component: CustomerListComponent},
    {path: 'expand', component: ExpansionComponent}
];

@NgModule({
    imports: [RouterModule.forChild(customerRoutes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
