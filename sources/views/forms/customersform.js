import {JetView, plugins} from "webix-jet";
import {customers} from "models/customers";
import {getRoles} from "models/roles";

export default class CustomersForm extends JetView {
  
	config() {
		return {
      view : "form", paddingY:20, paddingX:30,
      elementsConfig: {labelWidth:100},
			elements:[
        {type:"header", height:45, template:"Users Info Editor"},
        {view:"text", name:"name", label:"Name"},
        {view:"text", name:"email", label:"Email"},
        {view:"combo", name:"role", label:"Role", localId:'roleCombo',
         options: []
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
        email:webix.rules.isEmail,
        role:webix.rules.isNotEmpty
      }
		}
  }

  init(){
    this.on(this.app, "roles:get", () => {   
      this.$$('roleCombo').getPopup().getList().clearAll();
      getRoles().then((data)=>{
        let rolesArray = data.map(obj => obj.role);
        this.$$('roleCombo').getPopup().getList().parse(rolesArray);
      })
    }) 
  }
  
  urlChange(form){
    customers.waitData.then(() => {
      const id = this.getParam("id");
      if(id && customers.exists(id)){
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
    if(id){
      webix.ajax().put('http://localhost:3000/api/users/'+id, values)
      .then((data) => {
        customers.updateItem(id, values)
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.response);
        webix.message({type: 'error', text: response.error.message});
      })
    }
    else{  
      webix.ajax().post('http://localhost:3000/api/users', values)
      .then((data) => {
        customers.add(data.json());
      })
      .fail((xhr) => {
        var response = JSON.parse(xhr.response);
        webix.message({type: 'error', text: response.error.message});
      })
    }
  }
}