import {JetView, plugins} from "webix-jet";
import CustomersData from "views/customersdata";
import CustomersForm from "views/forms/customersform";
import RolesView from "views/roles";

export default class CustomersView extends JetView {
	config() {
		return {
      rows:[
        {
          view:"toolbar", css:"subbar", padding:0,
          elements:[
            {
              view:"button", id:"button:add", type:"iconButton",
              icon:"plus", label:"Add User", width:140,
              click:() => {
                this.$$('multi').setValue("formView");
                this.app.callEvent("roles:get");
              }
            },
            {
              view:"button", id:"button:manage", type:"iconButton",
              icon:"plus", label:"Manage Roles", width:140,
              click:() => {
                this.app.callEvent("roles:show");
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
            onViewChange:(prev)=>{       // To disable-enable add user / manage roles button
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

  /** Function to detect url change to change multiview value */
  urlChange(){
    const id = this.getParam("id");
    if(id)
      this.$$("multi").setValue("formView");
    else
      this.$$("multi").setValue("gridView");
  }


  /** For Roles window  */
  init(view){
    this.window = this.ui(RolesView);
  }
  
}