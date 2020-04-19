import {JetView, plugins} from "webix-jet";
import CustomersData from "views/customersdata";
import CustomersForm from "views/forms/customersform";


export default class CustomersView extends JetView {
	config() {
		return {
      rows:[
        {
          view:"toolbar", css:"subbar", padding:0,
          elements:[
            // {
            //   height:50, css:"title", borderless:true,
            //   template:`<div class='header'>Customers</div>`
            //             // <div class='details'>( info & editing )</div>`
            // },
            {
              view:"button", id:"button:add", type:"iconButton",
              icon:"plus", label:"Add customer", width:140,
              click:() => {
                this.$$('multi').setValue("formView");
              }
            },
            {
              view:"button", id:"button:manage", type:"iconButton",
              icon:"plus", label:"Manage Roles", width:140,
              click:() => {
                // this.$$('multi').setValue("formView");
              }
            }
          ]
        },
        {
          animate:false,
          fitBiggest:true,
          localId:"multi",
          cells:[
            {id:"gridView", $subview:CustomersData},
            {id:"formView", $subview:CustomersForm}
          ],
          on:{
            onViewChange:(prev)=>{
              if(prev == "gridView"){
                this.$$("button:add").disable();
                this.$$("button:manage").disable();
              }
              else{
                this.$$("button:add").enable();
                this.$$("button:manage").enable();
              }
            }
          }
        }
      ]   
		};
  }
  urlChange(){
    const id = this.getParam("id");
    if(id)
      this.$$("multi").setValue("formView");
    else
      this.$$("multi").setValue("gridView");
  }
  
}