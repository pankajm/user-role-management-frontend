import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{

	config(){
		return {
			rows : [
				{ type:"header",
				  template:"Toolbar",
					view:"toolbar",
					elements: [
						{ view : "label", height:45 , width:200, label:"<a class='app_logo'></a>"},
						{}
					],
					css:"app_header",
					height:50
				},
				{ cols : [
					// MenuView,
					{width:200},
					{ $subview : true},
					{width:200},

				]},
				{ template : "All rights Reserved", height:40, css:"footer" }
			]
		}
	}



	// config(){
	// 	var header = {
	// 		type:"header", template:this.app.config.name, css:"webix_header app_header"
	// 	};

	// 	var menu = {
	// 		view:"menu", id:"top:menu", 
	// 		css:"app_menu",
	// 		width:180, layout:"y", select:true,
	// 		template:"<span class='webix_icon #icon#'></span> #value# ",
	// 		data:[
	// 			{ value:"Dashboard", id:"start", icon:"wxi-columns" },
	// 			{ value:"Data",		 id:"data",  icon:"wxi-pencil" }
	// 		]
	// 	};

	// 	var ui = {
	// 		type:"clean", paddingX:5, css:"app_layout", cols:[
	// 			{  paddingX:5, paddingY:10, rows: [ {css:"webix_shadow_medium", rows:[header, menu]} ]},
	// 			{ type:"wide", paddingY:10, paddingX:5, rows:[
	// 				{ $subview:true } 
	// 			]}
	// 		]
	// 	};

	// 	return ui;
	// }
	// init(){
	// 	// this.use(plugins.Menu, "top:menu");
	// }
}