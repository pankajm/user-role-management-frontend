import {JetView, plugins} from "webix-jet";
import {data} from "models/data";

export default class MenuView extends JetView {
	config() {
		return {
			view : "menu",
			css:"app_menu",
			width:180,	
			layout : "y", 
			select : true,
			template : (obj) => {
				return `<span class='webix_icon fa-${obj.icon}'></span>${obj.value}`;
			},

		};
	}

	init(view) {
		view.parse(data);
		this.use(plugins.Menu, view);
	}
}
