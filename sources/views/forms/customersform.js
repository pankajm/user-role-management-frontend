import {JetView, plugins} from "webix-jet";
import {customers} from "models/customers";



export default class CustomersForm extends JetView {
	config() {
		return {
      view : "form", paddingY:20, paddingX:30,
      elementsConfig: {labelWidth:100},
			elements:[
        {type:"header", height:45, template:"Customers Info Editor"},
        {view:"text", name:"name", label:"Name"},
        {view:"text", name:"email", label:"Email"},
        {view:"combo", name:"role", label:"Role",
         options:["Admin", "Supervisor", "Client"]
        },
        {
          margin:10,
          cols:[
            {view:"button", value: "<< Back", align:"center", width:120,
             click:() => {
               this.getBack();
             }},
            {view:"button", value:"save", type:"form", align:"center", width:120,
             click:() => {
               const form = this.getRoot();
               if(form.validate()){
                 this.saveCustomer(form.getValues());
                 this.getBack();
               }
             }},
            {}
          ] 
        }
      ],
      rules:{
        name:webix.rules.isNotEmpty,
        email:webix.rules.isEmail
      }
		}
  }
  
  urlChange(form){
    customers.waitData.then(() => {
      const id = this.getParam("id");
    if(id && customers.exists(id)){
      console.log(customers.getItem(id))
      form.setValues(customers.getItem(id));
    }
    })
  }

  getBack(){
    const form = this.getRoot();
    form.clear();
    form.clearValidation();
    this.show("customers");
  }

  saveCustomer(values){
    const id = values.id;
    if(id)
      customers.updateItem(id, values)
  }
  
}