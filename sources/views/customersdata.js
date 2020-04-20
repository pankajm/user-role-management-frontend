import {JetView, plugins} from "webix-jet";
import {customers} from "models/customers";

export default class CustomersData extends JetView {
	config() {
		return {
      view : "datatable",
      editable:true,
      autoConfig:true,
      select: true,
      scroll:"y",
      onClick:{
        delete_button: function (ev, id){
          webix.confirm({
            text:"The User will be deleted, <br/> Are you sure?",
            ok:"Yes", cancel:"Cancel",
            callback:(res) => {
              if(res){
                webix.ajax().del('http://localhost:3000/api/users/'+id).then((data) => {
                  customers.remove(id);
                })
              }
            }
          })
        },

        edit_button: function (ev, id){
          this.$scope.show("customers?id="+id);
          console.log('Edit clicked'+id);
          this.app.callEvent("roles:get");
        },

      },
      onAfterLoad:() => {
        console.log('onafterload');
      },
			columns:[
        {id:"edit", select:true, header:"", template:"<button class='edit_button'>{common.editIcon()}</button>"},
        {id:"name", header:["Name", {content:"textFilter"}], sort:"text", width:200},
        {id:"email", header:["Email", {content:"textFilter"}], sort:"text", fillspace:true},
        {id:"role", header:["Role", {content:"textFilter"}], sort:"text", width:200},
        {id: "delete", select:true, header:"", template: "<button class='delete_button'>{common.trashIcon()}</button>"}
      ]
		}
  }
  
  init(view){
    customers.waitData.then(() => {
      console.log('customers - ');
      console.log(customers);
      view.parse(customers);
    });
  }
}