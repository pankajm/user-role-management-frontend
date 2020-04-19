import {JetView, plugins} from "webix-jet";
import CustomersData from "views/customersdata";
import CustomersForm from "views/forms/customersform";


export default class CustomersView extends JetView {
	config() {
		return {
      animate:false,
      fitBiggest:true,
      localId:"multi",
      cells:[
        {id:"gridView", $subview:CustomersData},
        {id:"formView", $subview:CustomersForm}
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