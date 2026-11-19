var e = {
	table: {
		headerOnly: {
			baseFromSpec: "tableHeaderOnly",
			instructions: ["buildColgroup", "buildHeader"],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: { initialize: "serialRoot" }
			}
		},
		simple: {
			baseFromSpec: "tableSimple",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		withFooter: {
			baseFromSpec: "tableWithFooter",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildFooter",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		bodyOnly: {
			baseFromSpec: "tableBodyOnly",
			instructions: ["buildBody"],
			options: { serial: { showSerial: "serialChild" } }
		}
	},
	select: { simple: {
		baseFromSpec: "selectBase",
		instructions: ["buildSelectWithOptions"],
		options: {}
	} },
	dataList: { simple: {
		baseFromSpec: "dataListSimple",
		instructions: ["buildDataListWithOptions"],
		options: {}
	} },
	selectOptionsOnly: { simple: {
		baseFromSpec: "selectOptionsOnlyBase",
		instructions: ["buildOptionsArray"],
		options: {}
	} },
	searchInput: { simple: {
		baseFromSpec: "searchInputBase",
		instructions: [],
		options: {}
	} },
	form: { simple: {
		baseFromSpec: "formSimple",
		instructions: ["buildFormField"],
		options: {}
	} },
	accordion: {
		simple: {
			baseFromSpec: "accordionSimple",
			instructions: ["buildAccordionItems"],
			options: {}
		},
		flush: {
			baseFromSpec: "accordionFlush",
			instructions: ["buildAccordionItems"],
			options: {}
		}
	},
	card: {
		simple: {
			baseFromSpec: "cardSimple",
			instructions: ["buildCardBody"],
			options: {}
		},
		withHeader: {
			baseFromSpec: "cardWithHeader",
			instructions: ["buildCardHeader", "buildCardBody"],
			options: {}
		},
		withFooter: {
			baseFromSpec: "cardWithFooter",
			instructions: [
				"buildCardHeader",
				"buildCardBody",
				"buildCardFooter"
			],
			options: {}
		},
		imageTop: {
			baseFromSpec: "cardImageTop",
			instructions: ["buildCardBody"],
			options: {}
		}
	},
	list: {
		simple: {
			baseFromSpec: "listSimple",
			instructions: ["buildListItems"],
			options: {}
		},
		group: {
			baseFromSpec: "listGroup",
			instructions: ["buildListGroupItems"],
			options: {}
		},
		ordered: {
			baseFromSpec: "listOrdered",
			instructions: ["buildListGroupItems"],
			options: {}
		}
	},
	menu: {
		simple: {
			baseFromSpec: "menuSimple",
			instructions: ["buildMenuItems"],
			options: {}
		},
		cards: {
			baseFromSpec: "menuCardsBase",
			instructions: ["buildMenuCards"],
			options: {}
		}
	}
}, t = {
	tableSearchBar: {
		tagName: "div",
		attributes: { class: "row mb-3 align-items-center" },
		children: [
			{
				tagName: "div",
				attributes: { class: "col-md-4 d-flex align-items-center" },
				children: [{
					tagName: "h6",
					attributes: {
						class: "mb-0 fw-semibold text-secondary",
						id: "table-title"
					},
					textContent: "Items"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4 text-center d-flex align-items-center justify-content-center" },
				children: [{
					tagName: "span",
					attributes: {
						id: "search-feedback",
						class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
					},
					textContent: "Showing all records"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4" },
				children: [{
					tagName: "div",
					attributes: { class: "input-group" },
					children: [{
						tagName: "span",
						attributes: { class: "input-group-text bg-white" },
						children: [{
							tagName: "i",
							attributes: { class: "bi bi-search" },
							textContent: "🔍"
						}]
					}, {
						tagName: "input",
						attributes: {
							type: "text",
							id: "tableSearch",
							class: "form-control",
							placeholder: "Search table..."
						}
					}]
				}]
			}
		]
	},
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	},
	tableWithSearch: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-withSearch-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-withSearch-table-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-simple-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-simple-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-simple-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-simple-body-id"
						},
						children: []
					}
				]
			}]
		}]
	},
	tableSimple: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				}
			]
		}]
	},
	tableWithFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableBodyOnly: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-tag-id"
		},
		children: [{
			tagName: "tbody",
			attributes: {
				"data-role": "table-body",
				id: "table-body-id"
			},
			children: []
		}]
	},
	tableBodyOnly1: {
		tagName: "tbody",
		attributes: {
			"data-role": "table-body",
			id: "table-body-only-id"
		},
		children: []
	},
	tableFooterOnly: {
		tagName: "tfoot",
		attributes: {
			"data-role": "table-footer",
			id: "table-footer-only-id"
		},
		children: [{
			tagName: "tr",
			attributes: {
				"data-role": "table-footer-row",
				id: "table-footer-only-footer-row-id"
			},
			children: []
		}]
	},
	tableHeaderOnly: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-colgroup-id"
				},
				children: []
			}, {
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-row-id"
					},
					children: []
				}]
			}]
		}]
	},
	tableHeaderOnly1: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-header-only-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-header-only-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-only-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-only-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-header-only-body-id"
				},
				children: []
			}
		]
	},
	tableHeaderAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	selectBase: {
		tagName: "div",
		attributes: {
			"data-role": "select-container",
			id: "select-base-id"
		},
		children: []
	},
	dataListBase: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-base-id"
		},
		children: []
	},
	dataListSimple: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-simple-id"
		},
		children: []
	},
	selectOptionsOnlyBase: [],
	searchInputBase: {
		tagName: "div",
		attributes: {
			class: "d-flex align-items-center gap-2",
			id: "search-input-base-id"
		},
		children: [{
			tagName: "label",
			textContent: "${label}",
			attributes: {
				class: "form-label mb-0 text-nowrap fw-semibold",
				for: "${id}",
				id: "search-input-label-id"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "search",
				placeholder: "${placeholder}",
				class: "form-control",
				id: "search-input-field-id"
			}
		}]
	},
	formBase: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-base-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-base-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-base-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-base-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-base-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-base-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-base-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-base-submit-button-id"
					}
				}]
			}
		]
	},
	formSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-simple-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-simple-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-simple-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-simple-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-simple-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-simple-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-simple-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-simple-submit-button-id"
					}
				}]
			}
		]
	},
	searchToolbar: {
		tagName: "div",
		attributes: {
			class: "row mb-3 align-items-center",
			"data-role": "search-toolbar"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 d-flex align-items-center",
					"data-role": "search-label-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 text-center d-flex align-items-center justify-content-center",
					"data-role": "search-helper-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4",
					"data-role": "search-input-slot"
				},
				children: []
			}
		]
	},
	searchLabel: {
		tagName: "h6",
		textContent: "Items",
		attributes: {
			class: "mb-0 fw-semibold text-secondary",
			id: "table-title"
		}
	},
	searchHelper: {
		tagName: "span",
		textContent: "Showing all records",
		attributes: {
			id: "search-feedback",
			class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
		}
	},
	searchInput: {
		tagName: "div",
		attributes: { class: "input-group" },
		children: [{
			tagName: "span",
			attributes: { class: "input-group-text bg-white" },
			children: [{
				tagName: "i",
				attributes: { class: "bi bi-search" },
				textContent: "🔍"
			}]
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "tableSearch",
				class: "form-control",
				placeholder: "Search table..."
			}
		}]
	},
	optionsEditButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "edit",
			attributes: { class: "btn btn-secondary btn-sm ks-btn-edit" }
		}]
	},
	optionsDeleteButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "delete",
			attributes: { class: "btn btn-danger btn-sm ks-btn-delete" }
		}]
	},
	headerForEditOption: {
		tagName: "th",
		textContent: "edit",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	headerForDeleteOption: {
		tagName: "th",
		textContent: "delete",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForEditOption: {
		tagName: "col",
		attributes: { width: "80px" }
	},
	colGroupForDeleteOption: {
		tagName: "col",
		attributes: { width: "90px" }
	},
	tableWithFooterParent: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-footer-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-with-footer-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-with-footer-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-with-footer-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-with-footer-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-with-footer-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-with-footer-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-with-footer-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableWithSearchAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-search-footer-parent-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-with-footer-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-with-footer-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-with-footer-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-with-footer-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-with-footer-body-id"
						},
						children: []
					},
					{
						tagName: "tfoot",
						attributes: {
							"data-role": "table-footer",
							id: "table-with-footer-footer-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-footer-row",
								id: "table-with-footer-footer-row-id"
							},
							children: []
						}]
					}
				]
			}]
		}]
	},
	accordionSimple: {
		tagName: "div",
		attributes: {
			class: "accordion shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	accordionFlush: {
		tagName: "div",
		attributes: {
			class: "accordion accordion-flush shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	buildAccordionItem: {
		tagName: "div",
		attributes: {
			class: "accordion-item",
			"data-role": "accordion-item"
		},
		children: [{
			tagName: "h2",
			attributes: {
				class: "accordion-header",
				id: "heading-${id}"
			},
			children: [{
				tagName: "button",
				attributes: {
					class: "accordion-button collapsed",
					type: "button",
					"data-bs-toggle": "collapse",
					"data-bs-target": "#collapse-${id}",
					"aria-expanded": "false",
					"aria-controls": "collapse-${id}"
				},
				textContent: "${title}"
			}]
		}, {
			tagName: "div",
			attributes: {
				id: "collapse-${id}",
				class: "accordion-collapse collapse",
				"aria-labelledby": "heading-${id}",
				"data-bs-parent": "#accordion-parent-id",
				"data-role": "accordion-collapse"
			},
			children: [{
				tagName: "div",
				attributes: { class: "accordion-body text-secondary" },
				textContent: "${content}"
			}]
		}]
	},
	cardSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithHeader: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-header bg-white py-3 fw-bold border-bottom",
				"data-role": "card-header"
			},
			children: []
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithFooter: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 fw-bold border-bottom",
					"data-role": "card-header"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					"data-role": "card-body"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light py-3 border-top",
					"data-role": "card-footer"
				},
				children: []
			}
		]
	},
	cardImageTop: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3 overflow-hidden",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "img",
			attributes: {
				class: "card-img-top",
				src: "${imageSrc}",
				alt: "${imageAlt}",
				"data-role": "card-img"
			}
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	buildCardBodyTemplate: {
		tagName: "div",
		attributes: { class: "card-content" },
		children: [{
			tagName: "h5",
			attributes: { class: "card-title fw-bold text-dark mb-2" },
			textContent: "${title}"
		}, {
			tagName: "p",
			attributes: { class: "card-text text-secondary mb-3" },
			textContent: "${text}"
		}]
	},
	buildCardHeaderTemplate: {
		tagName: "span",
		attributes: { class: "card-header-title text-dark" },
		textContent: "${headerTitle}"
	},
	buildCardFooterTemplate: {
		tagName: "small",
		attributes: { class: "text-muted" },
		textContent: "${footerText}"
	},
	listSimple: {
		tagName: "ul",
		attributes: {
			class: "list-unstyled mb-0",
			id: "list-parent-id",
			"data-role": "list-parent"
		},
		children: []
	},
	listGroup: {
		tagName: "ul",
		attributes: {
			class: "list-group shadow-sm",
			id: "list-group-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	listOrdered: {
		tagName: "ol",
		attributes: {
			class: "list-group list-group-numbered shadow-sm",
			id: "list-ordered-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	menuSimple: {
		tagName: "ul",
		attributes: {
			class: "nav nav-pills flex-column bg-white p-3 rounded-3 shadow-sm border",
			id: "menu-parent-id",
			"data-role": "menu-parent"
		},
		children: []
	},
	menuCardsBase: {
		tagName: "div",
		attributes: {
			class: "row g-4",
			id: "menu-cards-parent-id",
			"data-role": "menu-cards-parent"
		},
		children: []
	},
	buildListItemTemplate: {
		tagName: "li",
		attributes: {
			class: "py-2 px-3 border-bottom d-flex align-items-center text-secondary",
			"data-role": "list-item"
		},
		textContent: "${text}"
	},
	buildListGroupItemTemplate: {
		tagName: "li",
		attributes: {
			class: "list-group-item d-flex justify-content-between align-items-center py-3",
			"data-role": "list-group-item"
		},
		children: [{
			tagName: "span",
			textContent: "${text}"
		}, {
			tagName: "span",
			attributes: { class: "badge bg-primary rounded-pill px-3 py-2" },
			textContent: "${badge}"
		}]
	},
	buildMenuItemTemplate: {
		tagName: "li",
		attributes: {
			class: "nav-item mb-1",
			"data-role": "menu-item"
		},
		children: [{
			tagName: "a",
			attributes: {
				class: "nav-link text-dark fw-medium",
				href: "${href}"
			},
			textContent: "${text}"
		}]
	},
	buildMenuCardItemTemplate: {
		tagName: "div",
		attributes: {
			class: "col-md-4 col-sm-6",
			"data-role": "menu-card-col"
		},
		children: [{
			tagName: "div",
			attributes: { class: "card h-100 shadow-sm border rounded-3" },
			children: [{
				tagName: "div",
				attributes: { class: "card-body p-4 d-flex flex-column" },
				children: [
					{
						tagName: "h5",
						attributes: { class: "card-title fw-bold text-primary mb-2" },
						textContent: "${title}"
					},
					{
						tagName: "p",
						attributes: { class: "card-text text-muted small flex-grow-1" },
						textContent: "${description}"
					},
					{
						tagName: "a",
						attributes: {
							class: "btn btn-outline-primary btn-sm mt-3",
							href: "${href}"
						},
						textContent: "${actionText}"
					}
				]
			}]
		}]
	}
}, n = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, r = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "TagsCatalogSchema",
	description: "JSON Schema for @keshavsoft/spec-repo tags.json catalog",
	type: "object",
	patternProperties: { "^[a-z0-9]+$": {
		type: "object",
		required: [
			"allowsTextContent",
			"allowsChildren",
			"allowedAttributes"
		],
		properties: {
			allowsTextContent: {
				type: "boolean",
				description: "Indicates whether the element permits direct textContent"
			},
			allowsChildren: {
				type: "boolean",
				description: "Indicates whether the element can contain child DOM elements"
			},
			allowedAttributes: {
				type: "array",
				items: { type: "string" },
				description: "List of specifically allowed HTML attributes for this tag"
			},
			childTags: {
				type: "array",
				items: { type: "string" },
				description: "Permitted child tag names if restricted"
			}
		},
		additionalProperties: !1
	} }
}, i = {
	buildColgroup: {
		type: "single",
		narration: "Build column widths",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildColGroup",
		func: "fromCollection"
	},
	buildHeader: {
		type: "single",
		narration: "Build table header",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildHeader",
		func: "fromCollection"
	},
	buildFooter: {
		type: "single",
		narration: "Build table footer",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFooter",
		func: "fromCollection"
	},
	buildBody: {
		type: "rowOnColumn",
		narration: "Build table body",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		templateKey: {
			rowKey: "buildBodyTr",
			columnKey: "buildBodyCell"
		}
	},
	serial: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial number cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshiftSerialToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "buildBodyCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	search: [{
		narration: "Prepend the search row to top of the table.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-parent']"
		},
		sourcePath: null,
		templateKey: "tableSearch",
		func: null
	}],
	buildFormField: {
		type: "single",
		narration: "Build form fields from columns",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'form-body']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFormField",
		func: "fromCollection"
	},
	buildSelectWithOptions: {
		type: "columnOnRow",
		narration: "Build selects with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildSelect",
			rowKey: "buildOption"
		}
	},
	buildSelectOptions: {
		type: "single",
		narration: "Build select options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildOptionsArray: {
		type: "single",
		narration: "Build options array",
		destinationPath: {
			fileName: "base",
			filePath: []
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildDataListWithOptions: {
		type: "columnOnRow",
		narration: "Build datalists with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildDataList",
			rowKey: "buildOption"
		}
	},
	searchFrame: [{
		narration: "Insert the search toolbar frame before the table when a search feature is enabled.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$"
		},
		sourcePath: null,
		templateKey: "searchToolbar",
		func: null,
		skipIf: "$..*[?@.attributes['data-role'] == 'search-toolbar']"
	}],
	searchLabel: [{
		narration: "Insert the search label into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-label-slot']"
		},
		sourcePath: null,
		templateKey: "searchLabel",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'table-title']"
	}],
	searchHelper: [{
		narration: "Insert the search helper text into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-helper-slot']"
		},
		sourcePath: null,
		templateKey: "searchHelper",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'search-feedback']"
	}],
	searchInput: [{
		narration: "Insert the search input into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-input-slot']"
		},
		sourcePath: null,
		templateKey: "searchInput",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'tableSearch']"
	}],
	serialRoot: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	serialChild: [{
		narration: "Prepend the serial number cell into each table body row.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshiftSerialToRows",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		sourcePath: null,
		templateKey: "buildBodyCell",
		func: null
	}],
	optionsShowButton: [
		{
			narration: "Append the options column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForOption",
			func: null
		},
		{
			narration: "Append the options header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForOption",
			func: null
		},
		{
			narration: "Append the options button cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsButtonCell",
			func: null
		},
		{
			narration: "Append the options footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "tdWithButtonSaveWarning",
			func: null
		}
	],
	optionsEditButton: [
		{
			narration: "Append edit column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForEditOption",
			func: null
		},
		{
			narration: "Append edit header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForEditOption",
			func: null
		},
		{
			narration: "Append edit button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsEditButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the edit action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	optionsDeleteButton: [
		{
			narration: "Append delete column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForDeleteOption",
			func: null
		},
		{
			narration: "Append delete header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForDeleteOption",
			func: null
		},
		{
			narration: "Append delete button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsDeleteButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the delete action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	buildAccordionItems: {
		type: "single",
		narration: "Build accordion items from array",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildAccordionItem",
		func: "fromCollection"
	},
	buildCardBody: {
		type: "single",
		narration: "Build card body content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-body']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardBodyTemplate",
		func: "applyTemplate"
	},
	buildCardHeader: {
		type: "single",
		narration: "Build card header content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-header']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardHeaderTemplate",
		func: "applyTemplate"
	},
	buildCardFooter: {
		type: "single",
		narration: "Build card footer content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-footer']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardFooterTemplate",
		func: "applyTemplate"
	},
	buildListItems: {
		type: "single",
		narration: "Build simple list items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListItemTemplate",
		func: "fromCollection"
	},
	buildListGroupItems: {
		type: "single",
		narration: "Build list-group items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListGroupItemTemplate",
		func: "fromCollection"
	},
	buildMenuItems: {
		type: "single",
		narration: "Build navigation menu items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuItemTemplate",
		func: "fromCollection"
	},
	buildMenuCards: {
		type: "single",
		narration: "Build menu cards grid",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuCardItemTemplate",
		func: "fromCollection"
	}
}, a = {
	name: "spec-repo",
	version: "1.17.1"
};
// ../spec-repo/src/v19/index.js
(({ spec: e, tags: t, tagsSchema: n, definitions: r, table: i }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: a,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r,
		table: i
	});
})({
	spec: t,
	tags: n,
	tagsSchema: r,
	instructions: i,
	definitions: e
});
var o = {
	table: {
		headerOnly: {
			baseFromSpec: "tableHeaderOnly",
			instructions: ["buildColgroup", "buildHeader"],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: { initialize: "serialRoot" }
			}
		},
		simple: {
			baseFromSpec: "tableSimple",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		withFooter: {
			baseFromSpec: "tableWithFooter",
			instructions: [
				"buildColgroup",
				"buildHeader",
				"buildFooter",
				"buildBody"
			],
			options: {
				search: {
					initialize: "searchFrame",
					showLabel: "searchLabel",
					showHelper: "searchHelper",
					showInput: "searchInput"
				},
				serial: {
					initialize: "serialRoot",
					showSerial: "serialChild"
				},
				options: {
					showButton: "optionsShowButton",
					showEditButton: "optionsEditButton",
					showDeleteButton: "optionsDeleteButton"
				}
			}
		},
		bodyOnly: {
			baseFromSpec: "tableBodyOnly",
			instructions: ["buildBody"],
			options: { serial: { showSerial: "serialChild" } }
		}
	},
	select: { simple: {
		baseFromSpec: "selectBase",
		instructions: ["buildSelectWithOptions"],
		options: {}
	} },
	dataList: { simple: {
		baseFromSpec: "dataListSimple",
		instructions: ["buildDataListWithOptions"],
		options: {}
	} },
	selectOptionsOnly: { simple: {
		baseFromSpec: "selectOptionsOnlyBase",
		instructions: ["buildOptionsArray"],
		options: {}
	} },
	searchInput: { simple: {
		baseFromSpec: "searchInputBase",
		instructions: [],
		options: {}
	} },
	form: { simple: {
		baseFromSpec: "formSimple",
		instructions: ["buildFormField"],
		options: {}
	} },
	accordion: {
		simple: {
			baseFromSpec: "accordionSimple",
			instructions: ["buildAccordionItems"],
			options: {}
		},
		flush: {
			baseFromSpec: "accordionFlush",
			instructions: ["buildAccordionItems"],
			options: {}
		}
	},
	card: {
		simple: {
			baseFromSpec: "cardSimple",
			instructions: ["buildCardBody"],
			options: {}
		},
		withHeader: {
			baseFromSpec: "cardWithHeader",
			instructions: ["buildCardHeader", "buildCardBody"],
			options: {}
		},
		withFooter: {
			baseFromSpec: "cardWithFooter",
			instructions: [
				"buildCardHeader",
				"buildCardBody",
				"buildCardFooter"
			],
			options: {}
		},
		imageTop: {
			baseFromSpec: "cardImageTop",
			instructions: ["buildCardBody"],
			options: {}
		}
	},
	list: {
		simple: {
			baseFromSpec: "listSimple",
			instructions: ["buildListItems"],
			options: {}
		},
		group: {
			baseFromSpec: "listGroup",
			instructions: ["buildListGroupItems"],
			options: {}
		},
		ordered: {
			baseFromSpec: "listOrdered",
			instructions: ["buildListGroupItems"],
			options: {}
		}
	},
	menu: {
		simple: {
			baseFromSpec: "menuSimple",
			instructions: ["buildMenuItems"],
			options: {}
		},
		cards: {
			baseFromSpec: "menuCardsBase",
			instructions: ["buildMenuCards"],
			options: {}
		}
	}
}, s = {
	tableSearchBar: {
		tagName: "div",
		attributes: { class: "row mb-3 align-items-center" },
		children: [
			{
				tagName: "div",
				attributes: { class: "col-md-4 d-flex align-items-center" },
				children: [{
					tagName: "h6",
					attributes: {
						class: "mb-0 fw-semibold text-secondary",
						id: "table-title"
					},
					textContent: "Items"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4 text-center d-flex align-items-center justify-content-center" },
				children: [{
					tagName: "span",
					attributes: {
						id: "search-feedback",
						class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
					},
					textContent: "Showing all records"
				}]
			},
			{
				tagName: "div",
				attributes: { class: "col-md-4" },
				children: [{
					tagName: "div",
					attributes: { class: "input-group" },
					children: [{
						tagName: "span",
						attributes: { class: "input-group-text bg-white" },
						children: [{
							tagName: "i",
							attributes: { class: "bi bi-search" },
							textContent: "🔍"
						}]
					}, {
						tagName: "input",
						attributes: {
							type: "text",
							id: "tableSearch",
							class: "form-control",
							placeholder: "Search table..."
						}
					}]
				}]
			}
		]
	},
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	},
	tableWithSearch: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-withSearch-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-withSearch-table-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-simple-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-simple-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-simple-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-simple-body-id"
						},
						children: []
					}
				]
			}]
		}]
	},
	tableSimple: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				}
			]
		}]
	},
	tableWithFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableBodyOnly: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-tag-id"
		},
		children: [{
			tagName: "tbody",
			attributes: {
				"data-role": "table-body",
				id: "table-body-id"
			},
			children: []
		}]
	},
	tableBodyOnly1: {
		tagName: "tbody",
		attributes: {
			"data-role": "table-body",
			id: "table-body-only-id"
		},
		children: []
	},
	tableFooterOnly: {
		tagName: "tfoot",
		attributes: {
			"data-role": "table-footer",
			id: "table-footer-only-id"
		},
		children: [{
			tagName: "tr",
			attributes: {
				"data-role": "table-footer-row",
				id: "table-footer-only-footer-row-id"
			},
			children: []
		}]
	},
	tableHeaderOnly: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-tag-id"
			},
			children: [{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-colgroup-id"
				},
				children: []
			}, {
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-row-id"
					},
					children: []
				}]
			}]
		}]
	},
	tableHeaderOnly1: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-header-only-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-header-only-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-only-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-only-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-header-only-body-id"
				},
				children: []
			}
		]
	},
	tableHeaderAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	selectBase: {
		tagName: "div",
		attributes: {
			"data-role": "select-container",
			id: "select-base-id"
		},
		children: []
	},
	dataListBase: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-base-id"
		},
		children: []
	},
	dataListSimple: {
		tagName: "div",
		attributes: {
			"data-role": "datalist-container",
			id: "data-list-simple-id"
		},
		children: []
	},
	selectOptionsOnlyBase: [],
	searchInputBase: {
		tagName: "div",
		attributes: {
			class: "d-flex align-items-center gap-2",
			id: "search-input-base-id"
		},
		children: [{
			tagName: "label",
			textContent: "${label}",
			attributes: {
				class: "form-label mb-0 text-nowrap fw-semibold",
				for: "${id}",
				id: "search-input-label-id"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "search",
				placeholder: "${placeholder}",
				class: "form-control",
				id: "search-input-field-id"
			}
		}]
	},
	formBase: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-base-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-base-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-base-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-base-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-base-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-base-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-base-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-base-submit-button-id"
					}
				}]
			}
		]
	},
	formSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border-0",
			id: "form-simple-id"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
					id: "form-simple-header-id"
				},
				children: [{
					tagName: "h2",
					textContent: "Data Entry Form",
					attributes: {
						class: "h5 fw-bold mb-0 text-dark",
						id: "form-simple-title-id"
					}
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					id: "form-simple-body-id"
				},
				children: [{
					tagName: "form",
					attributes: {
						id: "form-simple-form-id",
						"data-role": "form-body"
					},
					children: []
				}]
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
					id: "form-simple-footer-id"
				},
				children: [{
					tagName: "button",
					textContent: "Reset",
					attributes: {
						type: "reset",
						class: "btn btn-outline-secondary",
						id: "form-simple-reset-button-id"
					}
				}, {
					tagName: "button",
					textContent: "Submit",
					attributes: {
						type: "submit",
						class: "btn btn-primary",
						id: "form-simple-submit-button-id"
					}
				}]
			}
		]
	},
	searchToolbar: {
		tagName: "div",
		attributes: {
			class: "row mb-3 align-items-center",
			"data-role": "search-toolbar"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 d-flex align-items-center",
					"data-role": "search-label-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4 text-center d-flex align-items-center justify-content-center",
					"data-role": "search-helper-slot"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "col-md-4",
					"data-role": "search-input-slot"
				},
				children: []
			}
		]
	},
	searchLabel: {
		tagName: "h6",
		textContent: "Items",
		attributes: {
			class: "mb-0 fw-semibold text-secondary",
			id: "table-title"
		}
	},
	searchHelper: {
		tagName: "span",
		textContent: "Showing all records",
		attributes: {
			id: "search-feedback",
			class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
		}
	},
	searchInput: {
		tagName: "div",
		attributes: { class: "input-group" },
		children: [{
			tagName: "span",
			attributes: { class: "input-group-text bg-white" },
			children: [{
				tagName: "i",
				attributes: { class: "bi bi-search" },
				textContent: "🔍"
			}]
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "tableSearch",
				class: "form-control",
				placeholder: "Search table..."
			}
		}]
	},
	optionsEditButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "edit",
			attributes: { class: "btn btn-secondary btn-sm ks-btn-edit" }
		}]
	},
	optionsDeleteButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "delete",
			attributes: { class: "btn btn-danger btn-sm ks-btn-delete" }
		}]
	},
	headerForEditOption: {
		tagName: "th",
		textContent: "edit",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	headerForDeleteOption: {
		tagName: "th",
		textContent: "delete",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForEditOption: {
		tagName: "col",
		attributes: { width: "80px" }
	},
	colGroupForDeleteOption: {
		tagName: "col",
		attributes: { width: "90px" }
	},
	tableWithFooterParent: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-footer-parent-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-with-footer-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-with-footer-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-with-footer-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-with-footer-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-with-footer-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-with-footer-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-with-footer-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableWithSearchAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-with-search-footer-parent-id"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "row mb-3 align-items-center",
				"data-role": "search-toolbar"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 d-flex align-items-center",
						"data-role": "search-label-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4 text-center d-flex align-items-center justify-content-center",
						"data-role": "search-helper-slot"
					},
					children: []
				},
				{
					tagName: "div",
					attributes: {
						class: "col-md-4",
						"data-role": "search-input-slot"
					},
					children: []
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-with-footer-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-with-footer-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-with-footer-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-with-footer-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-with-footer-body-id"
						},
						children: []
					},
					{
						tagName: "tfoot",
						attributes: {
							"data-role": "table-footer",
							id: "table-with-footer-footer-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-footer-row",
								id: "table-with-footer-footer-row-id"
							},
							children: []
						}]
					}
				]
			}]
		}]
	},
	accordionSimple: {
		tagName: "div",
		attributes: {
			class: "accordion shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	accordionFlush: {
		tagName: "div",
		attributes: {
			class: "accordion accordion-flush shadow-sm rounded-3 border",
			id: "accordion-parent-id",
			"data-role": "accordion-parent"
		},
		children: []
	},
	buildAccordionItem: {
		tagName: "div",
		attributes: {
			class: "accordion-item",
			"data-role": "accordion-item"
		},
		children: [{
			tagName: "h2",
			attributes: {
				class: "accordion-header",
				id: "heading-${id}"
			},
			children: [{
				tagName: "button",
				attributes: {
					class: "accordion-button collapsed",
					type: "button",
					"data-bs-toggle": "collapse",
					"data-bs-target": "#collapse-${id}",
					"aria-expanded": "false",
					"aria-controls": "collapse-${id}"
				},
				textContent: "${title}"
			}]
		}, {
			tagName: "div",
			attributes: {
				id: "collapse-${id}",
				class: "accordion-collapse collapse",
				"aria-labelledby": "heading-${id}",
				"data-bs-parent": "#accordion-parent-id",
				"data-role": "accordion-collapse"
			},
			children: [{
				tagName: "div",
				attributes: { class: "accordion-body text-secondary" },
				textContent: "${content}"
			}]
		}]
	},
	cardSimple: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithHeader: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "div",
			attributes: {
				class: "card-header bg-white py-3 fw-bold border-bottom",
				"data-role": "card-header"
			},
			children: []
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	cardWithFooter: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [
			{
				tagName: "div",
				attributes: {
					class: "card-header bg-white py-3 fw-bold border-bottom",
					"data-role": "card-header"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-body p-4",
					"data-role": "card-body"
				},
				children: []
			},
			{
				tagName: "div",
				attributes: {
					class: "card-footer bg-light py-3 border-top",
					"data-role": "card-footer"
				},
				children: []
			}
		]
	},
	cardImageTop: {
		tagName: "div",
		attributes: {
			class: "card shadow-sm border rounded-3 overflow-hidden",
			id: "card-parent-id",
			"data-role": "card-parent"
		},
		children: [{
			tagName: "img",
			attributes: {
				class: "card-img-top",
				src: "${imageSrc}",
				alt: "${imageAlt}",
				"data-role": "card-img"
			}
		}, {
			tagName: "div",
			attributes: {
				class: "card-body p-4",
				"data-role": "card-body"
			},
			children: []
		}]
	},
	buildCardBodyTemplate: {
		tagName: "div",
		attributes: { class: "card-content" },
		children: [{
			tagName: "h5",
			attributes: { class: "card-title fw-bold text-dark mb-2" },
			textContent: "${title}"
		}, {
			tagName: "p",
			attributes: { class: "card-text text-secondary mb-3" },
			textContent: "${text}"
		}]
	},
	buildCardHeaderTemplate: {
		tagName: "span",
		attributes: { class: "card-header-title text-dark" },
		textContent: "${headerTitle}"
	},
	buildCardFooterTemplate: {
		tagName: "small",
		attributes: { class: "text-muted" },
		textContent: "${footerText}"
	},
	listSimple: {
		tagName: "ul",
		attributes: {
			class: "list-unstyled mb-0",
			id: "list-parent-id",
			"data-role": "list-parent"
		},
		children: []
	},
	listGroup: {
		tagName: "ul",
		attributes: {
			class: "list-group shadow-sm",
			id: "list-group-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	listOrdered: {
		tagName: "ol",
		attributes: {
			class: "list-group list-group-numbered shadow-sm",
			id: "list-ordered-parent-id",
			"data-role": "list-group-parent"
		},
		children: []
	},
	menuSimple: {
		tagName: "ul",
		attributes: {
			class: "nav nav-pills flex-column bg-white p-3 rounded-3 shadow-sm border",
			id: "menu-parent-id",
			"data-role": "menu-parent"
		},
		children: []
	},
	menuCardsBase: {
		tagName: "div",
		attributes: {
			class: "row g-4",
			id: "menu-cards-parent-id",
			"data-role": "menu-cards-parent"
		},
		children: []
	},
	buildListItemTemplate: {
		tagName: "li",
		attributes: {
			class: "py-2 px-3 border-bottom d-flex align-items-center text-secondary",
			"data-role": "list-item"
		},
		textContent: "${text}"
	},
	buildListGroupItemTemplate: {
		tagName: "li",
		attributes: {
			class: "list-group-item d-flex justify-content-between align-items-center py-3",
			"data-role": "list-group-item"
		},
		children: [{
			tagName: "span",
			textContent: "${text}"
		}, {
			tagName: "span",
			attributes: { class: "badge bg-primary rounded-pill px-3 py-2" },
			textContent: "${badge}"
		}]
	},
	buildMenuItemTemplate: {
		tagName: "li",
		attributes: {
			class: "nav-item mb-1",
			"data-role": "menu-item"
		},
		children: [{
			tagName: "a",
			attributes: {
				class: "nav-link text-dark fw-medium",
				href: "${href}"
			},
			textContent: "${text}"
		}]
	},
	buildMenuCardItemTemplate: {
		tagName: "div",
		attributes: {
			class: "col-md-4 col-sm-6",
			"data-role": "menu-card-col"
		},
		children: [{
			tagName: "div",
			attributes: { class: "card h-100 shadow-sm border rounded-3" },
			children: [{
				tagName: "div",
				attributes: { class: "card-body p-4 d-flex flex-column" },
				children: [
					{
						tagName: "h5",
						attributes: { class: "card-title fw-bold text-primary mb-2" },
						textContent: "${title}"
					},
					{
						tagName: "p",
						attributes: { class: "card-text text-muted small flex-grow-1" },
						textContent: "${description}"
					},
					{
						tagName: "a",
						attributes: {
							class: "btn btn-outline-primary btn-sm mt-3",
							href: "${href}"
						},
						textContent: "${actionText}"
					}
				]
			}]
		}]
	}
}, c = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, l = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "TagsCatalogSchema",
	description: "JSON Schema for @keshavsoft/spec-repo tags.json catalog",
	type: "object",
	patternProperties: { "^[a-z0-9]+$": {
		type: "object",
		required: [
			"allowsTextContent",
			"allowsChildren",
			"allowedAttributes"
		],
		properties: {
			allowsTextContent: {
				type: "boolean",
				description: "Indicates whether the element permits direct textContent"
			},
			allowsChildren: {
				type: "boolean",
				description: "Indicates whether the element can contain child DOM elements"
			},
			allowedAttributes: {
				type: "array",
				items: { type: "string" },
				description: "List of specifically allowed HTML attributes for this tag"
			},
			childTags: {
				type: "array",
				items: { type: "string" },
				description: "Permitted child tag names if restricted"
			}
		},
		additionalProperties: !1
	} }
}, u = {
	buildColgroup: {
		type: "single",
		narration: "Build column widths",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildColGroup",
		func: "fromCollection"
	},
	buildHeader: {
		type: "single",
		narration: "Build table header",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildHeader",
		func: "fromCollection"
	},
	buildFooter: {
		type: "single",
		narration: "Build table footer",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFooter",
		func: "fromCollection"
	},
	buildBody: {
		type: "rowOnColumn",
		narration: "Build table body",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		templateKey: {
			rowKey: "buildBodyTr",
			columnKey: "buildBodyCell"
		}
	},
	serial: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial number cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshiftSerialToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "buildBodyCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	search: [{
		narration: "Prepend the search row to top of the table.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-parent']"
		},
		sourcePath: null,
		templateKey: "tableSearch",
		func: null
	}],
	buildFormField: {
		type: "single",
		narration: "Build form fields from columns",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			jsonPath: "$..*[?@.attributes['data-role'] == 'form-body']"
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.columns"
		},
		templateKey: "buildFormField",
		func: "fromCollection"
	},
	buildSelectWithOptions: {
		type: "columnOnRow",
		narration: "Build selects with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildSelect",
			rowKey: "buildOption"
		}
	},
	buildSelectOptions: {
		type: "single",
		narration: "Build select options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildOptionsArray: {
		type: "single",
		narration: "Build options array",
		destinationPath: {
			fileName: "base",
			filePath: []
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.data"
		},
		templateKey: "buildOption",
		func: "fromCollection"
	},
	buildDataListWithOptions: {
		type: "columnOnRow",
		narration: "Build datalists with options",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		templateKey: {
			columnKey: "buildDataList",
			rowKey: "buildOption"
		}
	},
	searchFrame: [{
		narration: "Insert the search toolbar frame before the table when a search feature is enabled.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshift",
			jsonPath: "$"
		},
		sourcePath: null,
		templateKey: "searchToolbar",
		func: null,
		skipIf: "$..*[?@.attributes['data-role'] == 'search-toolbar']"
	}],
	searchLabel: [{
		narration: "Insert the search label into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-label-slot']"
		},
		sourcePath: null,
		templateKey: "searchLabel",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'table-title']"
	}],
	searchHelper: [{
		narration: "Insert the search helper text into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-helper-slot']"
		},
		sourcePath: null,
		templateKey: "searchHelper",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'search-feedback']"
	}],
	searchInput: [{
		narration: "Insert the search input into its configured slot.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'search-input-slot']"
		},
		sourcePath: null,
		templateKey: "searchInput",
		func: null,
		skipIf: "$..*[?@.attributes.id == 'tableSearch']"
	}],
	serialRoot: [
		{
			narration: "Prepend the serial column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForSerial",
			func: null
		},
		{
			narration: "Prepend the serial header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		},
		{
			narration: "Prepend the serial footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "unshift",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "headerSerialCell",
			func: null
		}
	],
	serialChild: [{
		narration: "Prepend the serial number cell into each table body row.",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "unshiftSerialToRows",
			jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
		},
		sourcePath: null,
		templateKey: "buildBodyCell",
		func: null
	}],
	optionsShowButton: [
		{
			narration: "Append the options column width to the table colgroup.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForOption",
			func: null
		},
		{
			narration: "Append the options header cell to the table header row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForOption",
			func: null
		},
		{
			narration: "Append the options button cell into each table body row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsButtonCell",
			func: null
		},
		{
			narration: "Append the options footer cell to the table footer row.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "tdWithButtonSaveWarning",
			func: null
		}
	],
	optionsEditButton: [
		{
			narration: "Append edit column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForEditOption",
			func: null
		},
		{
			narration: "Append edit header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForEditOption",
			func: null
		},
		{
			narration: "Append edit button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsEditButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the edit action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	optionsDeleteButton: [
		{
			narration: "Append delete column width.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-colgroup']"
			},
			sourcePath: null,
			templateKey: "colGroupForDeleteOption",
			func: null
		},
		{
			narration: "Append delete header.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-header-row']"
			},
			sourcePath: null,
			templateKey: "headerForDeleteOption",
			func: null
		},
		{
			narration: "Append delete button cells to table rows.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "pushToRows",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-body']"
			},
			sourcePath: null,
			templateKey: "optionsDeleteButtonCell",
			func: null
		},
		{
			narration: "Append an empty footer cell for the delete action column.",
			destinationPath: {
				fileName: "base",
				filePath: ["children"],
				action: "push",
				jsonPath: "$..*[?@.attributes['data-role'] == 'table-footer-row']"
			},
			sourcePath: null,
			templateKey: "emptyCell",
			func: null
		}
	],
	buildAccordionItems: {
		type: "single",
		narration: "Build accordion items from array",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildAccordionItem",
		func: "fromCollection"
	},
	buildCardBody: {
		type: "single",
		narration: "Build card body content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-body']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardBodyTemplate",
		func: "applyTemplate"
	},
	buildCardHeader: {
		type: "single",
		narration: "Build card header content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-header']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardHeaderTemplate",
		func: "applyTemplate"
	},
	buildCardFooter: {
		type: "single",
		narration: "Build card footer content",
		destinationPath: {
			fileName: "base",
			filePath: ["children"],
			action: "push",
			jsonPath: "$..*[?@.attributes['data-role'] == 'card-footer']"
		},
		sourcePath: { fileName: "data" },
		templateKey: "buildCardFooterTemplate",
		func: "applyTemplate"
	},
	buildListItems: {
		type: "single",
		narration: "Build simple list items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListItemTemplate",
		func: "fromCollection"
	},
	buildListGroupItems: {
		type: "single",
		narration: "Build list-group items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildListGroupItemTemplate",
		func: "fromCollection"
	},
	buildMenuItems: {
		type: "single",
		narration: "Build navigation menu items",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuItemTemplate",
		func: "fromCollection"
	},
	buildMenuCards: {
		type: "single",
		narration: "Build menu cards grid",
		destinationPath: {
			fileName: "base",
			filePath: ["children"]
		},
		sourcePath: {
			fileName: "data",
			jsonPath: "$.items"
		},
		templateKey: "buildMenuCardItemTemplate",
		func: "fromCollection"
	}
}, d = {
	name: "spec-repo",
	version: "1.17.1"
};
// ../json-renderers-run-instructions-steps/node_modules/spec-repo/src/v19/index.js
(({ spec: e, tags: t, tagsSchema: n, definitions: r, table: i }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: d,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r,
		table: i
	});
})({
	spec: s,
	tags: c,
	tagsSchema: l,
	instructions: u,
	definitions: o
});
// ../json-renderers-run-instructions-steps/node_modules/json-transformer-funcs-primitive/src/v10/forAttributes/index.js
var f = (e) => typeof e == "object" && !!e && !Array.isArray(e), p = (e, t) => {
	if (!f(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = _(t, i);
	return n;
}, m = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => _(t, e));
}, ee = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, h = (e, t) => ee(e, t), te = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, ne = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, g = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: ne,
		applyTemplate: e
	});
}, _ = (e, t, n) => {
	let r = e, i = t;
	te(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? ee(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = h(a?.textContent, r)), "attributes" in a && (a.attributes = p(a?.attributes, r)), "children" in a && (a.children = m(a?.children, r))), a);
};
g(_);
// ../json-renderers-run-instructions-steps/node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var v = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, y = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, re = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: y,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, ie = (e, t) => {
	let n = e, r = t;
	return v(n, r), n.map((e) => _(e, r));
};
re((e, t) => {
	let n = e;
	return v(n, t), n.map((e) => _(e, e[t]));
}, ie);
// ../json-transformer-funcs-two-dimensions/node_modules/json-transformer-funcs-primitive/src/v10/forAttributes/index.js
var ae = (e) => typeof e == "object" && !!e && !Array.isArray(e), oe = (e, t) => {
	if (!ae(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = fe(t, i);
	return n;
}, se = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => fe(t, e));
}, ce = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, le = (e, t) => ce(e, t), ue = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, de = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, b = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: de,
		applyTemplate: e
	});
}, fe = (e, t, n) => {
	let r = e, i = t;
	ue(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? ce(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = le(a?.textContent, r)), "attributes" in a && (a.attributes = oe(a?.attributes, r)), "children" in a && (a.children = se(a?.children, r))), a);
};
b(fe);
// ../json-transformer-funcs-one-dimension/node_modules/json-transformer-funcs-primitive/src/v9/forAttributes/index.js
var pe = (e) => typeof e == "object" && !!e && !Array.isArray(e), me = (e, t) => {
	if (!pe(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = xe(t, i);
	return n;
}, he = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => xe(t, e));
}, ge = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, _e = (e, t) => ge(e, t), ve = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, ye = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, be = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.applyTemplate ??= e, globalThis.ks.transformerFuncs ??= {}, globalThis.ks.transformerFuncs.primitive = {
		meta: ye,
		applyTemplate: e
	});
}, xe = (e, t, n) => {
	let r = e, i = t;
	ve(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? ge(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = _e(a?.textContent, r)), "attributes" in a && (a.attributes = me(a?.attributes, r)), "children" in a && (a.children = he(a?.children, r))), a);
};
be(xe);
// ../json-transformer-funcs-one-dimension/src/v9/guard/index.js
var Se = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Ce = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, we = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Ce,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Te = (e, t) => {
	let n = e, r = t;
	return Se(n, r), n.map((e) => xe(e, r));
};
we((e, t) => {
	let n = e;
	return Se(n, t), n.map((e) => xe(e, e[t]));
}, Te);
// ../json-transformer-funcs-two-dimensions/src/v9/index.js
var Ee = ({ outer: e = [], outerSpec: t, getInner: n, innerSpec: r } = {}) => e.map((e) => {
	let i = fe(e, t), a = n ? n(e) : [];
	return i.children = a.length > 0 ? Te(a, r) : [], i;
}), De = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => Ee({
	outer: Array.isArray(t) ? t : t?.data ?? t?.rows ?? [],
	outerSpec: r,
	innerSpec: n,
	getInner: (t) => e.map((e) => ({
		...e,
		rowValue: t[e.columnName]
	}))
}), Oe = ({ columns: e = [], data: t = [], rows: n, columnSpec: r, rowSpec: i } = {}) => {
	let a = n ?? (Array.isArray(t) ? t : t?.data ?? t?.rows ?? []);
	return Ee({
		outer: e,
		outerSpec: r,
		innerSpec: i,
		getInner: (e) => Array.isArray(e.options) && e.options.length > 0 ? e.options.map((e) => typeof e == "object" ? e : { rowValue: e }) : a.map((t) => ({
			...t,
			rowValue: t[e.columnName] ?? t.value ?? t
		}))
	});
}, ke = (e) => Array.isArray(e) ? e : [e], Ae = (e, t, n) => {
	e[t] = n;
}, je = {
	set: Ae,
	push: (e, t, n) => {
		e[t].push(...ke(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...ke(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(ke(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(ke(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, Me = Object.defineProperty, Ne = Object.getOwnPropertySymbols, Pe = Object.prototype.hasOwnProperty, Fe = Object.prototype.propertyIsEnumerable, Ie = Math.pow, Le = (e, t, n) => t in e ? Me(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Re = (e, t) => {
	for (var n in t ||= {}) Pe.call(t, n) && Le(e, n, t[n]);
	if (Ne) for (var n of Ne(t)) Fe.call(t, n) && Le(e, n, t[n]);
	return e;
}, ze = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, Be = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, x = () => void 0, Ve = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = C(e);
		return r === C(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = Ke(e), a = Ke(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, He = (e, t, n = x) => {
	let r = [];
	if (!Ve(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!Ve(Ue(e.x, t), Ue(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !S(o, i) || !S(a, i)) return !1;
			let s = a[i];
			if (!S(o, i) || !Ve(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, S = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Ue = (e, t) => S(e, t) ? e[t] : void 0, We = 16383, Ge = 1e3, Ke = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > Ge) throw new Be(`Member name too long (maximum ${Ge} characters)`);
	return t;
}, C = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, qe = (e) => e instanceof RangeError && /call stack/i.test(e.message), w = (e) => Array.isArray(e), Je = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), T = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, Ye = (e) => typeof e == "number", E = (e) => typeof e == "string", Xe = (e) => e === void 0, D = (e) => e !== void 0;
function Ze(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function Qe(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function $e(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var et = class extends SyntaxError {
	constructor(e, t, n, r) {
		super(e), this.expected = t, this.found = n, this.location = r, this.name = "SyntaxError";
	}
	format(e) {
		let t = "Error: " + this.message;
		if (this.location) {
			let n = null, r = e.find((e) => e.source === this.location.source);
			r && (n = r.text.split(/\r\n|\n|\r/g));
			let i = this.location.start, a = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, o = this.location.source + ":" + a.line + ":" + a.column;
			if (n) {
				let e = this.location.end, r = "".padEnd(a.line.toString().length, " "), s = n[i.line - 1], c = (i.line === e.line ? e.column : s.length + 1) - i.column || 1;
				t += "\n --> " + o + "\n" + r + " |\n" + a.line + " | " + s + "\n" + r + " | " + "".padEnd(i.column - 1, " ") + "".padEnd(c, "^");
			} else t += "\n at " + o;
		}
		return t;
	}
	static buildMessage(e, t) {
		function n(e) {
			return e.codePointAt(0).toString(16).toUpperCase();
		}
		let r = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? /* @__PURE__ */ RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
		function i(e) {
			return r ? e.replace(r, (e) => "\\u{" + n(e) + "}") : e;
		}
		function a(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		function o(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		let s = {
			literal(e) {
				return "\"" + a(e.text) + "\"";
			},
			class(e) {
				let t = e.parts.map((e) => Array.isArray(e) ? o(e[0]) + "-" + o(e[1]) : o(e));
				return "[" + (e.inverted ? "^" : "") + t.join("") + "]" + (e.unicode ? "u" : "");
			},
			any() {
				return "any character";
			},
			end() {
				return "end of input";
			},
			other(e) {
				return e.description;
			}
		};
		function c(e) {
			return s[e.type](e);
		}
		function l(e) {
			let t = e.map(c);
			if (t.sort(), t.length > 0) {
				let e = 1;
				for (let n = 1; n < t.length; n++) t[n - 1] !== t[n] && (t[e] = t[n], e++);
				t.length = e;
			}
			switch (t.length) {
				case 1: return t[0];
				case 2: return t[0] + " or " + t[1];
				default: return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
			}
		}
		function u(e) {
			return e ? "\"" + a(e) + "\"" : "end of input";
		}
		return "Expected " + l(e) + " but " + u(t) + " found.";
	}
};
function tt(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Br }, a = Br, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", te = "true", ne = "false", g = "null", _ = /^[,\]]/, v = /^[+\-]/, y = /^[*\/]/, re = /^[a-zA-Z_]/, ie = /^[\x80-\uFFFF_]/, ae = /^[a-zA-Z0-9_]/, oe = /^[0-9@$\-]/, se = /^[^\/\\]/, ce = /^[gimsuy]/, le = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, ue = /^[\uD800-\uDBFF]/, de = /^[\uDC00-\uDFFF]/, b = /^[0-9]/, fe = /^[1-9]/, pe = /^[eE]/, me = /^["\\]/, he = /^['\\]/, ge = /^[ -\uD7FF\uE000-\uFFFF]/, _e = /^[dD]/, ve = /^[89abAB]/, ye = /^[c-fC-F]/, be = /^[0-9a-fA-F]/, xe = /^[ \t\n\r]/, Se = G([",", "]"], !1, !1, !1), Ce = W("length", !1), we = W("count", !1), Te = W("match", !1), Ee = W("search", !1), De = W("value", !1), Oe = G(["+", "-"], !1, !1, !1), ke = G(["*", "/"], !1, !1, !1), Ae = K("string"), je = G([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Me = G([["", "￿"], "_"], !1, !1, !1), Ne = G([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Pe = W("-", !1), Fe = G([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Ie = W("$", !1), Le = W("@", !1), Re = W("..", !1), ze = W(".", !1), Be = W("*", !1), x = W("&&", !1), Ve = W("||", !1), He = W("!", !1), S = W("==", !1), Ue = W("!=", !1), We = W(">=", !1), Ge = W(">", !1), Ke = W("<=", !1), C = W("<", !1), qe = W("=~", !1), w = W("in", !1), Je = W("nin", !1), T = W("subsetof", !1), Ye = W("anyof", !1), E = W("noneof", !1), Xe = W("sizeof", !1), D = W("size", !1), tt = W("empty", !1), nt = W("true", !1), rt = W("false", !1), it = W("null", !1), at = W("{", !1), ot = W("}", !1), st = W("[", !1), ct = W("]", !1), lt = W(":", !1), ut = W(",", !1), dt = W("(", !1), ft = W(")", !1), pt = W("?", !1), mt = K("regex"), ht = W("/", !1), gt = G(["/", "\\"], !0, !1, !1), _t = W("\\", !1), vt = Pr(), O = G([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), yt = G([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), bt = G([["\ud800", "\udbff"]], !1, !1, !1), xt = G([["\udc00", "\udfff"]], !1, !1, !1), k = G([["0", "9"]], !1, !1, !1), St = K("number"), Ct = W("0", !1), A = G([["1", "9"]], !1, !1, !1), wt = K("integer"), Tt = G(["e", "E"], !1, !1, !1), Et = W("\"", !1), Dt = W("'", !1), Ot = G(["\"", "\\"], !1, !1, !1), kt = G(["'", "\\"], !1, !1, !1), At = G([[" ", "퟿"], ["", "￿"]], !1, !1, !1), jt = W("b", !1), Mt = W("f", !1), Nt = W("n", !1), Pt = W("r", !1), Ft = W("t", !1), It = W("u", !1), Lt = G(["d", "D"], !1, !1, !1), Rt = G([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), zt = W("\\u", !1), Bt = G([["c", "f"], ["C", "F"]], !1, !1, !1), Vt = G([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Ht = G([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Ut(e) {
		return {
			type: "root",
			next: Ze(e)
		};
	}
	function Wt(e) {
		return e.map((e) => e[1]);
	}
	function Gt(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function Kt(e) {
		return e;
	}
	function qt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Jt() {
		return { type: "wildcard" };
	}
	function Yt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Xt() {
		return { type: "wildcard" };
	}
	function Zt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Qt(e) {
		return e;
	}
	function $t(e) {
		return e;
	}
	function en(e, t) {
		return t.length > 0 ? {
			type: "bracketExpression",
			value: {
				type: "unions",
				values: [e, ...t.map((e) => e[3])]
			}
		} : {
			type: e.type === "numericLiteral" || e.type === "stringLiteral" || e.type === "identifier" ? "bracketMember" : "bracketExpression",
			value: e
		};
	}
	function tn(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function nn(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function rn(e, t) {
		return $e(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function an(e, t) {
		return $e(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function on(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function sn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function cn(e, t) {
		return t !== null || Qe(e);
	}
	function ln(e, t) {
		if (t === null) return e;
		let n = t[1];
		return n.operator === "reg" ? {
			type: "comparator",
			operator: "reg",
			left: e,
			right: n.right
		} : n.operator === "empty" ? {
			type: "comparator",
			operator: "empty",
			left: e,
			right: null
		} : {
			type: "comparator",
			operator: n.operator,
			left: e,
			right: n.right
		};
	}
	function un(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function dn(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function fn() {
		return { operator: "empty" };
	}
	function pn() {
		return "eq";
	}
	function mn() {
		return "ne";
	}
	function hn() {
		return "le";
	}
	function gn() {
		return "lt";
	}
	function _n() {
		return "ge";
	}
	function vn() {
		return "gt";
	}
	function yn() {
		return "in";
	}
	function bn() {
		return "nin";
	}
	function xn() {
		return "subsetof";
	}
	function Sn() {
		return "anyof";
	}
	function Cn() {
		return "noneof";
	}
	function wn() {
		return "sizeof";
	}
	function Tn() {
		return "size";
	}
	function En(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function Dn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function On() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function kn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function An(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function jn() {
		return "length";
	}
	function Mn() {
		return "count";
	}
	function Nn() {
		return "match";
	}
	function Pn() {
		return "search";
	}
	function Fn() {
		return "value";
	}
	function In(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Ln(e, t) {
		return t.length === 0 ? e : $e(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function Rn(e, t) {
		return t.length === 0 ? e : $e(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function zn(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function Bn(e) {
		return {
			type: "root",
			next: Ze(e)
		};
	}
	function Vn(e) {
		return {
			type: "current",
			next: Ze(e)
		};
	}
	function Hn(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Un() {
		return { type: "wildcard" };
	}
	function Wn(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Gn(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function Kn(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function qn(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Jn(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Yn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function Xn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Zn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Qn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function $n(e) {
		return e;
	}
	function er(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function tr(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function nr(e, t) {
		return [e, t.value];
	}
	function rr(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function ir(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function j(e) {
		return _a(e);
	}
	function ar(e) {
		return _a(e);
	}
	function or() {
		return "true";
	}
	function M() {
		return "false";
	}
	function sr() {
		return "null";
	}
	function cr(e) {
		return _a(e);
	}
	function lr() {
		return "true";
	}
	function ur() {
		return "false";
	}
	function N() {
		return "null";
	}
	function dr(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function P(e) {
		return e.join("");
	}
	function fr(e, t) {
		let n = parseFloat(jr());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && Mr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function F() {
		let e = parseInt(jr(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && Mr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function pr(e) {
		return e.join("");
	}
	function I(e) {
		return e.join("");
	}
	function mr(e) {
		return e;
	}
	function L() {
		return "\"";
	}
	function hr(e) {
		return e;
	}
	function gr(e) {
		return e;
	}
	function _r() {
		return "'";
	}
	function vr(e) {
		return e;
	}
	function yr() {
		return "\\";
	}
	function br() {
		return "/";
	}
	function xr() {
		return "\b";
	}
	function Sr() {
		return "\f";
	}
	function Cr() {
		return "\n";
	}
	function wr() {
		return "\r";
	}
	function Tr() {
		return "	";
	}
	function Er(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function Dr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Or(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let R = t.peg$currPos | 0, z = R, B = [{
		line: 1,
		column: 1
	}], V = R, kr = t.peg$maxFailExpected || [], H = t.peg$silentFails | 0, Ar = /* @__PURE__ */ new Map(), U;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function jr() {
		return e.substring(z, R);
	}
	function Mr(e, t) {
		throw t = t === void 0 ? Lr(z, R) : t, Rr(e, t);
	}
	function Nr(t = R) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function W(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function G(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Pr() {
		return { type: "any" };
	}
	function Fr() {
		return { type: "end" };
	}
	function K(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Ir(t) {
		let n = B[t], r;
		if (n) return n;
		if (t >= B.length) r = B.length - 1;
		else for (r = t; !B[--r];);
		for (n = B[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return B[t] = n, n;
	}
	function Lr(e, t, n) {
		let i = Ir(e), a = Ir(t), o = {
			source: r,
			start: {
				offset: e,
				line: i.line,
				column: i.column
			},
			end: {
				offset: t,
				line: a.line,
				column: a.column
			}
		};
		return n && r && typeof r.offset == "function" && (o.start = r.offset(o.start), o.end = r.offset(o.end)), o;
	}
	function q(e) {
		R < V || (R > V && (V = R, kr = []), kr.push(e));
	}
	function Rr(e, t) {
		return new et(e, null, null, t);
	}
	function zr(e, t, n) {
		return new et(et.buildMessage(e, t), e, t, n);
	}
	function Br() {
		let e, t, r, i;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Vr(), i = ga(), i === n ? (R = e, e = n) : (z = e, e = Ut(r))), e;
	}
	function Vr() {
		let e, t, r, i, a;
		for (e = R, t = [], r = R, i = $(), a = Hr(), a === n ? (R = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = R, i = $(), a = Hr(), a === n ? (R = r, r = n) : (i = [i, a], r = i);
		return z = e, t = Wt(t), e = t, e;
	}
	function Hr() {
		let e;
		return e = Wr(), e === n && (e = Ur()), e;
	}
	function Ur() {
		let e, t, r;
		return e = R, t = Ei(), t === n ? (R = e, e = n) : (r = Gr(), r === n ? (R = e, e = n) : (z = e, e = Gt(r))), e === n && (e = R, t = qr(), t !== n && (z = e, t = Kt(t)), e = t), e;
	}
	function Wr() {
		let e, t, r;
		return e = R, t = Ti(), t === n ? (R = e, e = n) : (r = Kr(), r === n ? (R = e, e = n) : (z = e, e = qt(r))), e;
	}
	function Gr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = Jt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = Yt(t)), e = t), e;
	}
	function Kr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = Xt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = Zt(t)), e = t, e === n && (e = R, t = qr(), t !== n && (z = e, t = Qt(t)), e = t)), e;
	}
	function qr() {
		let e, t, r, i;
		return e = R, t = Zi(), t === n ? (R = e, e = n) : ($(), r = Jr(), r === n ? (R = e, e = n) : ($(), i = Qi(), i === n ? (R = e, e = n) : (z = e, e = $t(r)))), e;
	}
	function Jr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = fi(), t !== n) {
			for (r = [], i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = fi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = fi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = en(t, r);
		} else R = e, e = n;
		return e;
	}
	function Yr() {
		let t, r, i, a, o, s, c, l, u;
		return t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = ea(), i === n ? (R = t, t = n) : ($(), a = Xr(), a === n ? (R = t, t = n) : ($(), o = X(), o === n ? (R = t, t = n) : (s = R, H++, c = R, l = $(), u = e.charAt(R), _.test(u) ? R++ : (u = n, H === 0 && q(Se)), u === n ? (R = c, c = n) : (l = [l, u], c = l), H--, c === n ? s = n : (R = s, s = void 0), s === n ? (R = t, t = n) : (z = t, t = tn(a)))))), t === n && (t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = Xr(), i === n ? (R = t, t = n) : (z = t, t = nn(i)))), t;
	}
	function Xr() {
		let e, t, r, i, a, o, s, c, l = R * 91 + 10, u = Ar.get(l);
		if (u) return R = u.nextPos, u.result;
		if (e = R, t = Zr(), t !== n) {
			for (r = [], i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Zr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Zr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = rn(t, r);
		} else R = e, e = n;
		return Ar.set(l, {
			nextPos: R,
			result: e
		}), e;
	}
	function Zr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = Qr(), t !== n) {
			for (r = [], i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = Qr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = Qr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = an(t, r);
		} else R = e, e = n;
		return e;
	}
	function Qr() {
		let e, t, r, i, a;
		return e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = ea(), r === n ? (R = e, e = n) : ($(), i = Xr(), i === n ? (R = e, e = n) : ($(), a = X(), a === n ? (R = e, e = n) : (z = e, e = on(i))))), e === n && (e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = ni(), r === n ? (R = e, e = n) : (z = e, e = sn(r))), e === n && (e = $r())), e;
	}
	function $r() {
		let e, t, r, i, a;
		return e = R, t = si(), t === n ? (R = e, e = n) : (r = R, i = $(), a = ei(), a === n ? (R = r, r = n) : (i = [i, a], r = i), r === n && (r = null), z = R, i = cn(t, r), i = i ? void 0 : n, i === n ? (R = e, e = n) : (z = e, e = ln(t, r))), e === n && (e = ni()), e;
	}
	function ei() {
		let e, t, r;
		return e = R, t = ti(), t === n ? (R = e, e = n) : ($(), r = si(), r === n ? (R = e, e = n) : (z = e, e = un(t, r))), e === n && (e = R, t = Li(), t === n ? (R = e, e = n) : ($(), r = pi(), r === n ? (R = e, e = n) : (z = e, e = dn(r))), e === n && (e = R, t = Gi(), t !== n && (z = e, t = fn()), e = t)), e;
	}
	function ti() {
		let e, t;
		return e = R, t = ji(), t !== n && (z = e, t = pn()), e = t, e === n && (e = R, t = Mi(), t !== n && (z = e, t = mn()), e = t, e === n && (e = R, t = Fi(), t !== n && (z = e, t = hn()), e = t, e === n && (e = R, t = Ii(), t !== n && (z = e, t = gn()), e = t, e === n && (e = R, t = Ni(), t !== n && (z = e, t = _n()), e = t, e === n && (e = R, t = Pi(), t !== n && (z = e, t = vn()), e = t, e === n && (e = R, t = Ri(), t !== n && (z = e, t = yn()), e = t, e === n && (e = R, t = zi(), t !== n && (z = e, t = bn()), e = t, e === n && (e = R, t = Bi(), t !== n && (z = e, t = xn()), e = t, e === n && (e = R, t = Vi(), t !== n && (z = e, t = Sn()), e = t, e === n && (e = R, t = Hi(), t !== n && (z = e, t = Cn()), e = t, e === n && (e = R, t = Ui(), t !== n && (z = e, t = wn()), e = t, e === n && (e = R, t = Wi(), t !== n && (z = e, t = Tn()), e = t)))))))))))), e;
	}
	function ni() {
		let e, t, r, i;
		return e = R, t = ea(), t === n ? (R = e, e = n) : ($(), r = Xr(), r === n ? (R = e, e = n) : ($(), i = X(), i === n ? (R = e, e = n) : (z = e, e = En(r)))), e === n && (e = ri(), e === n && (e = ui(), e === n && (e = R, t = Ki(), t !== n && (z = e, t = Dn()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = On()), e = t, e === n && (e = R, t = Ji(), t !== n && (z = e, t = kn()), e = t))))), e;
	}
	function ri() {
		let e, t, r, i, a;
		return e = R, t = ii(), t === n ? (R = e, e = n) : (r = ea(), r === n ? (R = e, e = n) : ($(), i = ai(), i === n && (i = null), $(), a = X(), a === n ? (R = e, e = n) : (z = e, e = An(t, i)))), e;
	}
	function ii() {
		let t, r;
		return t = R, e.substr(R, 6) === o ? (r = o, R += 6) : (r = n, H === 0 && q(Ce)), r !== n && (z = t, r = jn()), t = r, t === n && (t = R, e.substr(R, 5) === s ? (r = s, R += 5) : (r = n, H === 0 && q(we)), r !== n && (z = t, r = Mn()), t = r, t === n && (t = R, e.substr(R, 5) === c ? (r = c, R += 5) : (r = n, H === 0 && q(Te)), r !== n && (z = t, r = Nn()), t = r, t === n && (t = R, e.substr(R, 6) === l ? (r = l, R += 6) : (r = n, H === 0 && q(Ee)), r !== n && (z = t, r = Pn()), t = r, t === n && (t = R, e.substr(R, 5) === u ? (r = u, R += 5) : (r = n, H === 0 && q(De)), r !== n && (z = t, r = Fn()), t = r)))), t;
	}
	function ai() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = oi(), t !== n) {
			for (r = [], i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = oi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = oi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = In(t, r);
		} else R = e, e = n;
		return e;
	}
	function oi() {
		let e;
		return e = si(), e === n && (e = mi()), e;
	}
	function si() {
		let t, r, i, a, o, s, c, l, u = R * 91 + 21, d = Ar.get(u);
		if (d) return R = d.nextPos, d.result;
		if (t = R, r = ci(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), v.test(s) ? R++ : (s = n, H === 0 && q(Oe)), s === n ? (R = a, a = n) : (c = $(), l = ci(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), v.test(s) ? R++ : (s = n, H === 0 && q(Oe)), s === n ? (R = a, a = n) : (c = $(), l = ci(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = Ln(r, i);
		} else R = t, t = n;
		return Ar.set(u, {
			nextPos: R,
			result: t
		}), t;
	}
	function ci() {
		let t, r, i, a, o, s, c, l;
		if (t = R, r = li(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), y.test(s) ? R++ : (s = n, H === 0 && q(ke)), s === n ? (R = a, a = n) : (c = $(), l = li(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), y.test(s) ? R++ : (s = n, H === 0 && q(ke)), s === n ? (R = a, a = n) : (c = $(), l = li(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = Rn(r, i);
		} else R = t, t = n;
		return t;
	}
	function li() {
		let e, t, r, i;
		return e = R, t = ea(), t === n ? (R = e, e = n) : ($(), r = si(), r === n ? (R = e, e = n) : ($(), i = X(), i === n ? (R = e, e = n) : (z = e, e = zn(r)))), e === n && (e = ri(), e === n && (e = J(), e === n && (e = ui()))), e;
	}
	function ui() {
		let e, t, r;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Vr(), r === n ? (R = e, e = n) : (z = e, e = Bn(r))), e === n && (e = R, t = wi(), t === n ? (R = e, e = n) : (r = Vr(), r === n ? (R = e, e = n) : (z = e, e = Vn(r)))), e;
	}
	function di() {
		let e, t, r, i, a, o, s, c, l;
		return e = R, t = R, r = la(), r === n ? (R = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = $i(), r === n ? (R = e, e = n) : (i = $(), a = R, o = la(), o === n ? (R = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = R, s = $i(), s === n ? (R = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), z = e, e = Hn(t, a, o)), e;
	}
	function fi() {
		let e, t;
		return e = Yr(), e === n && (e = di(), e === n && (e = R, t = Di(), t !== n && (z = e, t = Un()), e = t, e === n && (e = R, t = la(), t !== n && (z = e, t = Wn(t)), e = t, e === n && (e = R, t = da(), t !== n && (z = e, t = Gn(t)), e = t, e === n && (e = R, t = bi(), t !== n && (z = e, t = Kn(t)), e = t))))), e;
	}
	function pi() {
		let e, t, r;
		return e = R, t = na(), t === n ? (R = e, e = n) : (r = ra(), z = e, e = qn(t, r)), e;
	}
	function J() {
		let e, t;
		return e = R, t = mi(), t !== n && (z = e, t = Jn(t)), e = t, e === n && (e = R, t = sa(), t !== n && (z = e, t = Yn(t)), e = t, e === n && (e = hi(), e === n && (e = vi(), e === n && (e = R, t = Ki(), t !== n && (z = e, t = Xn()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = Zn()), e = t, e === n && (e = R, t = Ji(), t !== n && (z = e, t = Qn()), e = t)))))), e;
	}
	function mi() {
		let e, t;
		return H++, e = R, t = da(), t !== n && (z = e, t = $n(t)), e = t, H--, e === n && (t = n, H === 0 && q(Ae)), e;
	}
	function hi() {
		let e, t, r, i;
		return e = R, t = Yi(), t === n ? (R = e, e = n) : ($(), r = gi(), r === n && (r = null), $(), i = Xi(), i === n ? (R = e, e = n) : (z = e, e = er(r))), e;
	}
	function gi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = _i(), t !== n) {
			for (r = [], i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = tr(t, r);
		} else R = e, e = n;
		return e;
	}
	function _i() {
		let e, t, r, i;
		return e = R, t = da(), t === n ? (R = e, e = n) : ($(), r = $i(), r === n ? (R = e, e = n) : ($(), i = J(), i === n ? (R = e, e = n) : (z = e, e = nr(t, i)))), e;
	}
	function vi() {
		let e, t, r, i;
		return e = R, t = Zi(), t === n ? (R = e, e = n) : ($(), r = yi(), r === n && (r = null), $(), i = Qi(), i === n ? (R = e, e = n) : (z = e, e = rr(r))), e;
	}
	function yi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = J(), t !== n) {
			for (r = [], i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = J(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = J(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = ir(t, r);
		} else R = e, e = n;
		return e;
	}
	function bi() {
		let t, r, i, a, o, s;
		if (t = R, r = R, i = R, a = e.charAt(R), re.test(a) ? R++ : (a = n, H === 0 && q(je)), a !== n) {
			for (o = [], s = xi(); s !== n;) o.push(s), s = xi();
			a = [a, o], i = a;
		} else R = i, i = n;
		if (r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = j(r)), t = r, t === n) {
			if (t = R, r = R, i = [], a = e.charAt(R), ie.test(a) ? R++ : (a = n, H === 0 && q(Me)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(R), ie.test(a) ? R++ : (a = n, H === 0 && q(Me));
			else i = n;
			r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = ar(r)), t = r, t === n && (t = R, r = Ki(), r !== n && (z = t, r = or()), t = r, t === n && (t = R, r = qi(), r !== n && (z = t, r = M()), t = r, t === n && (t = R, r = Ji(), r !== n && (z = t, r = sr()), t = r)));
		}
		return t;
	}
	function xi() {
		let t, r, i, a;
		return t = e.charAt(R), ae.test(t) ? R++ : (t = n, H === 0 && q(Ne)), t === n && (t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, H === 0 && q(Pe)), r === n ? (R = t, t = n) : (i = R, H++, a = e.charAt(R), oe.test(a) ? R++ : (a = n, H === 0 && q(Fe)), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function Si() {
		let e, t;
		return e = R, t = ia(), t !== n && (z = e, t = cr(t)), e = t, e === n && (e = R, t = Ki(), t !== n && (z = e, t = lr()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = ur()), e = t, e === n && (e = R, t = Ji(), t !== n && (z = e, t = N()), e = t))), e;
	}
	function Ci() {
		let t;
		return e.charCodeAt(R) === 36 ? (t = "$", R++) : (t = n, H === 0 && q(Ie)), t;
	}
	function wi() {
		let t;
		return e.charCodeAt(R) === 64 ? (t = "@", R++) : (t = n, H === 0 && q(Le)), t;
	}
	function Ti() {
		let t;
		return e.substr(R, 2) === ".." ? (t = "..", R += 2) : (t = n, H === 0 && q(Re)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(R) === 46 ? (t = ".", R++) : (t = n, H === 0 && q(ze)), t;
	}
	function Di() {
		let t;
		return e.charCodeAt(R) === 42 ? (t = "*", R++) : (t = n, H === 0 && q(Be)), t;
	}
	function Oi() {
		let t;
		return e.substr(R, 2) === "&&" ? (t = "&&", R += 2) : (t = n, H === 0 && q(x)), t;
	}
	function ki() {
		let t;
		return e.substr(R, 2) === "||" ? (t = "||", R += 2) : (t = n, H === 0 && q(Ve)), t;
	}
	function Ai() {
		let t;
		return e.charCodeAt(R) === 33 ? (t = "!", R++) : (t = n, H === 0 && q(He)), t;
	}
	function ji() {
		let t;
		return e.substr(R, 2) === "==" ? (t = "==", R += 2) : (t = n, H === 0 && q(S)), t;
	}
	function Mi() {
		let t;
		return e.substr(R, 2) === "!=" ? (t = "!=", R += 2) : (t = n, H === 0 && q(Ue)), t;
	}
	function Ni() {
		let t;
		return e.substr(R, 2) === ">=" ? (t = ">=", R += 2) : (t = n, H === 0 && q(We)), t;
	}
	function Pi() {
		let t;
		return e.charCodeAt(R) === 62 ? (t = ">", R++) : (t = n, H === 0 && q(Ge)), t;
	}
	function Fi() {
		let t;
		return e.substr(R, 2) === "<=" ? (t = "<=", R += 2) : (t = n, H === 0 && q(Ke)), t;
	}
	function Ii() {
		let t;
		return e.charCodeAt(R) === 60 ? (t = "<", R++) : (t = n, H === 0 && q(C)), t;
	}
	function Li() {
		let t;
		return e.substr(R, 2) === "=~" ? (t = "=~", R += 2) : (t = n, H === 0 && q(qe)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = R, e.substr(R, 2) === "in" ? (r = "in", R += 2) : (r = n, H === 0 && q(w)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = R, e.substr(R, 3) === "nin" ? (r = "nin", R += 3) : (r = n, H === 0 && q(Je)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = R, e.substr(R, 8) === d ? (r = d, R += 8) : (r = n, H === 0 && q(T)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === f ? (r = f, R += 5) : (r = n, H === 0 && q(Ye)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === p ? (r = p, R += 6) : (r = n, H === 0 && q(E)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === m ? (r = m, R += 6) : (r = n, H === 0 && q(Xe)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === ee ? (r = ee, R += 4) : (r = n, H === 0 && q(D)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === h ? (r = h, R += 5) : (r = n, H === 0 && q(tt)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === te ? (r = te, R += 4) : (r = n, H === 0 && q(nt)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === ne ? (r = ne, R += 5) : (r = n, H === 0 && q(rt)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === g ? (r = g, R += 4) : (r = n, H === 0 && q(it)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(R) === 123 ? (t = "{", R++) : (t = n, H === 0 && q(at)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(R) === 125 ? (t = "}", R++) : (t = n, H === 0 && q(ot)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(R) === 91 ? (t = "[", R++) : (t = n, H === 0 && q(st)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(R) === 93 ? (t = "]", R++) : (t = n, H === 0 && q(ct)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(R) === 58 ? (t = ":", R++) : (t = n, H === 0 && q(lt)), t;
	}
	function Y() {
		let t;
		return e.charCodeAt(R) === 44 ? (t = ",", R++) : (t = n, H === 0 && q(ut)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(R) === 40 ? (t = "(", R++) : (t = n, H === 0 && q(dt)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(R) === 41 ? (t = ")", R++) : (t = n, H === 0 && q(ft)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(R) === 63 ? (t = "?", R++) : (t = n, H === 0 && q(pt)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (H++, t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, H === 0 && q(ht)), r !== n) {
			for (i = [], a = e.charAt(R), se.test(a) ? R++ : (a = n, H === 0 && q(gt)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, H === 0 && q(_t)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, H === 0 && q(vt)), s === n ? (R = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(R), se.test(a) ? R++ : (a = n, H === 0 && q(gt)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, H === 0 && q(_t)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, H === 0 && q(vt)), s === n ? (R = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(R) === 47 ? (a = "/", R++) : (a = n, H === 0 && q(ht)), a === n ? (R = t, t = n) : (z = t, t = dr(i));
		} else R = t, t = n;
		return H--, t === n && (r = n, H === 0 && q(mt)), t;
	}
	function ra() {
		let t, r, i;
		for (t = R, r = [], i = e.charAt(R), ce.test(i) ? R++ : (i = n, H === 0 && q(O)); i !== n;) r.push(i), i = e.charAt(R), ce.test(i) ? R++ : (i = n, H === 0 && q(O));
		return z = t, r = P(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = R, r = R, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else R = r, r = n;
		return t = r === n ? r : e.substring(t, R), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(R), le.test(t) ? R++ : (t = n, H === 0 && q(yt)), t === n && (t = R, r = e.charAt(R), ue.test(r) ? R++ : (r = n, H === 0 && q(bt)), r === n ? (R = t, t = n) : (i = e.charAt(R), de.test(i) ? R++ : (i = n, H === 0 && q(xt)), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(R), b.test(t) ? R++ : (t = n, H === 0 && q(k))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (H++, t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, H === 0 && q(Pe)), r === n && (r = null), i = ca(), i !== n) {
			if (a = R, e.charCodeAt(R) === 46 ? (o = ".", R++) : (o = n, H === 0 && q(ze)), o !== n) {
				if (s = [], c = e.charAt(R), b.test(c) ? R++ : (c = n, H === 0 && q(k)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(R), b.test(c) ? R++ : (c = n, H === 0 && q(k));
				else s = n;
				s === n ? (R = a, a = n) : (o = [o, s], a = o);
			} else R = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), z = t, t = fr(a, o);
		} else R = t, t = n;
		return H--, t === n && (r = n, H === 0 && q(St)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(R) === 48 ? (t = "0", R++) : (t = n, H === 0 && q(Ct)), t === n) {
			if (t = R, r = e.charAt(R), fe.test(r) ? R++ : (r = n, H === 0 && q(A)), r !== n) {
				for (i = [], a = e.charAt(R), b.test(a) ? R++ : (a = n, H === 0 && q(k)); a !== n;) i.push(a), a = e.charAt(R), b.test(a) ? R++ : (a = n, H === 0 && q(k));
				r = [r, i], t = r;
			} else R = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (H++, t = R, e.charCodeAt(R) === 48 ? (r = "0", R++) : (r = n, H === 0 && q(Ct)), r === n) {
			if (r = R, e.charCodeAt(R) === 45 ? (i = "-", R++) : (i = n, H === 0 && q(Pe)), i === n && (i = null), a = e.charAt(R), fe.test(a) ? R++ : (a = n, H === 0 && q(A)), a !== n) {
				for (o = [], s = e.charAt(R), b.test(s) ? R++ : (s = n, H === 0 && q(k)); s !== n;) o.push(s), s = e.charAt(R), b.test(s) ? R++ : (s = n, H === 0 && q(k));
				i = [
					i,
					a,
					o
				], r = i;
			} else R = r, r = n;
		}
		return r !== n && (z = t, r = F()), t = r, H--, t === n && (r = n, H === 0 && q(wt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = R, r = e.charAt(R), pe.test(r) ? R++ : (r = n, H === 0 && q(Tt)), r !== n) {
			if (i = e.charAt(R), v.test(i) ? R++ : (i = n, H === 0 && q(Oe)), i === n && (i = null), a = [], o = e.charAt(R), b.test(o) ? R++ : (o = n, H === 0 && q(k)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(R), b.test(o) ? R++ : (o = n, H === 0 && q(k));
			else a = n;
			a === n ? (R = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else R = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (H++, t = R, e.charCodeAt(R) === 34 ? (r = "\"", R++) : (r = n, H === 0 && q(Et)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(R) === 34 ? (a = "\"", R++) : (a = n, H === 0 && q(Et)), a === n ? (R = t, t = n) : (z = t, t = pr(i));
		} else R = t, t = n;
		if (t === n) {
			if (t = R, e.charCodeAt(R) === 39 ? (r = "'", R++) : (r = n, H === 0 && q(Dt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(R) === 39 ? (a = "'", R++) : (a = n, H === 0 && q(Dt)), a === n ? (R = t, t = n) : (z = t, t = I(i));
			} else R = t, t = n;
		}
		return H--, t === n && (r = n, H === 0 && q(Ae)), t;
	}
	function fa() {
		let t, r, i;
		return t = R, r = R, H++, i = e.charAt(R), me.test(i) ? R++ : (i = n, H === 0 && q(Ot)), H--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = mr(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(_t)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 34 ? (i = "\"", R++) : (i = n, H === 0 && q(Et)), i === n ? (R = t, t = n) : (z = t, t = L())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(_t)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = hr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = R, r = R, H++, i = e.charAt(R), he.test(i) ? R++ : (i = n, H === 0 && q(kt)), H--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = gr(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(_t)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 39 ? (i = "'", R++) : (i = n, H === 0 && q(Dt)), i === n ? (R = t, t = n) : (z = t, t = _r())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(_t)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = vr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(R), ge.test(t) ? R++ : (t = n, H === 0 && q(At)), t === n && (t = R, r = R, i = e.charAt(R), ue.test(i) ? R++ : (i = n, H === 0 && q(bt)), i === n ? (R = r, r = n) : (a = e.charAt(R), de.test(a) ? R++ : (a = n, H === 0 && q(xt)), a === n ? (R = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, R)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(_t)), r !== n && (z = t, r = yr()), t = r, t === n && (t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, H === 0 && q(ht)), r !== n && (z = t, r = br()), t = r, t === n && (t = R, e.charCodeAt(R) === 98 ? (r = "b", R++) : (r = n, H === 0 && q(jt)), r !== n && (z = t, r = xr()), t = r, t === n && (t = R, e.charCodeAt(R) === 102 ? (r = "f", R++) : (r = n, H === 0 && q(Mt)), r !== n && (z = t, r = Sr()), t = r, t === n && (t = R, e.charCodeAt(R) === 110 ? (r = "n", R++) : (r = n, H === 0 && q(Nt)), r !== n && (z = t, r = Cr()), t = r, t === n && (t = R, e.charCodeAt(R) === 114 ? (r = "r", R++) : (r = n, H === 0 && q(Pt)), r !== n && (z = t, r = wr()), t = r, t === n && (t = R, e.charCodeAt(R) === 116 ? (r = "t", R++) : (r = n, H === 0 && q(Ft)), r !== n && (z = t, r = Tr()), t = r, t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, H === 0 && q(It)), r === n ? (R = t, t = n) : (i = R, a = R, o = e.charAt(R), _e.test(o) ? R++ : (o = n, H === 0 && q(Lt)), o === n ? (R = a, a = n) : (s = e.charAt(R), ve.test(s) ? R++ : (s = n, H === 0 && q(Rt)), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (e.substr(R, 2) === "\\u" ? (a = "\\u", R += 2) : (a = n, H === 0 && q(zt)), a === n ? (R = t, t = n) : (o = R, s = R, c = e.charAt(R), _e.test(c) ? R++ : (c = n, H === 0 && q(Lt)), c === n ? (R = s, s = n) : (l = e.charAt(R), ye.test(l) ? R++ : (l = n, H === 0 && q(Bt)), l === n ? (R = s, s = n) : (u = Z(), u === n ? (R = s, s = n) : (d = Z(), d === n ? (R = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, R), o === n ? (R = t, t = n) : (z = t, t = Er(i, o))))), t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, H === 0 && q(It)), r === n ? (R = t, t = n) : (i = R, a = R, o = Z(), o === n ? (R = a, a = n) : (s = Z(), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (z = R, a = Dr(i), a = a ? n : void 0, a === n ? (R = t, t = n) : (z = t, t = Or(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(R), be.test(t) ? R++ : (t = n, H === 0 && q(Vt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(R), ae.test(t) ? R++ : (t = n, H === 0 && q(Ne)), t;
	}
	function $() {
		let t, r;
		for (H++, t = [], r = e.charAt(R), xe.test(r) ? R++ : (r = n, H === 0 && q(Ht)); r !== n;) t.push(r), r = e.charAt(R), xe.test(r) ? R++ : (r = n, H === 0 && q(Ht));
		return H--, t;
	}
	function ga() {
		let t, r;
		return t = R, H++, e.length > R ? (r = e.charAt(R), R++) : (r = n, H === 0 && q(vt)), H--, r === n ? t = void 0 : (R = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && Mr("Member name too long (maximum 1000 characters)"), e;
	}
	U = a();
	let va = U !== n && R === e.length;
	function ya() {
		throw U !== n && R < e.length && q(Fr()), zr(kr, V < e.length ? Nr(V) : null, V < e.length ? Lr(V, V + 1) : Lr(V, V));
	}
	if (t.peg$library) return {
		peg$result: U,
		peg$currPos: R,
		peg$FAILED: n,
		peg$maxFailExpected: kr,
		peg$maxFailPos: V,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return U;
	ya();
}
var nt = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), rt = {
	length: {
		args: ["value"],
		logical: !1
	},
	count: {
		args: ["nodes"],
		logical: !1
	},
	value: {
		args: ["nodes"],
		logical: !1
	},
	match: {
		args: ["value", "value"],
		logical: !0
	},
	search: {
		args: ["value", "value"],
		logical: !0
	}
}, it = (e) => {
	throw new ze(1, 1, e);
}, at = (e) => e.type === "root" || e.type === "current", ot = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function st(e) {
	let t = [{
		node: e,
		context: "nodes"
	}], n = (e) => {
		for (let n = e.next; n; n = n.next) {
			let e = n.value;
			if (e.type === "dotdot" && (e = e.value), e.type !== "bracketExpression") continue;
			let r = e.value, i = r.type === "unions" ? r.values : [r];
			for (let e of i) e.type === "filterExpression" && t.push({
				node: e.value,
				context: "test"
			});
		}
	};
	for (; t.length > 0;) {
		let { node: e, context: r } = t.pop();
		if (typeof e != "object" || !e) continue;
		let i = e;
		if (at(i)) r === "value" && !ot(i) && it("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && it(`Expected a query, found ${String(i.type)}`), i.type) {
			case "logicalExpression":
			case "notExpression":
			case "groupExpression":
				i.type === "logicalExpression" ? t.push({
					node: i.left,
					context: "test"
				}, {
					node: i.right,
					context: "test"
				}) : t.push({
					node: i.value,
					context: "test"
				});
				break;
			case "comparator": {
				let e = nt.has(i.operator) ? "value" : "any";
				t.push({
					node: i.left,
					context: e
				}), i.operator !== "reg" && t.push({
					node: i.right,
					context: e
				});
				break;
			}
			case "functionCall": {
				let e = i.name, n = rt[e], a = i.args;
				a.length !== n.args.length && it(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && it(`The result of ${e}() must be compared`), r === "value" && n.logical && it(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
					node: e,
					context: n.args[r]
				}));
				break;
			}
			case "operation":
				t.push({
					node: i.left,
					context: "value"
				}, {
					node: i.right,
					context: "value"
				});
				break;
			case "groupOperation":
				t.push({
					node: i.value,
					context: r === "any" ? "any" : "value"
				});
				break;
			case "value": r === "test" && it("A literal must be compared");
		}
	}
}
function ct(e) {
	let t;
	try {
		t = tt(e);
	} catch (e) {
		if (qe(e)) throw new ze(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new ze(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new ze(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return st(t), t;
}
var lt = /* @__PURE__ */ new Set([
	"(",
	")",
	"*",
	"+",
	"-",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"n",
	"r",
	"t",
	"{",
	"|",
	"}"
]), ut = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), dt = (e) => e >= 55296 && e <= 56319, ft = (e) => e >= 56320 && e <= 57343, pt = (e) => e !== void 0 && e >= "0" && e <= "9", mt = (e, t) => {
	let n = e.charCodeAt(t);
	return dt(n) && ft(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : dt(n) || ft(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, ht = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !lt.has(n) ? null : n === "n" ? {
		text: "\\n",
		length: 2,
		code: 10
	} : n === "r" ? {
		text: "\\r",
		length: 2,
		code: 13
	} : n === "t" ? {
		text: "\\t",
		length: 2,
		code: 9
	} : {
		text: "\\" + n,
		length: 2,
		code: n.charCodeAt(0)
	};
}, gt = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return ut.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, _t = (e, t) => {
	let n = e[t];
	return n === "\\" ? ht(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : mt(e, t);
}, vt = (e, t) => {
	let n = t + 1, r = "[";
	e[n] === "^" && (r += "^", n++);
	let i = !0;
	for (;;) {
		let a = e[n];
		if (a === void 0) return null;
		if (a === "]") return i ? null : {
			text: r + "]",
			length: n + 1 - t
		};
		if (a === "-") {
			if (!i && e[n + 1] !== "]") return null;
			r += "-", n++, i = !1;
			continue;
		}
		if (i = !1, a === "\\" && (e[n + 1] === "p" || e[n + 1] === "P")) {
			let t = gt(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = _t(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = _t(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, O = (e, t) => {
	let n = t + 1, r = n;
	for (; pt(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; pt(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, yt = (e) => {
	let t = e, n = "", r = 0, i = !1, a = 0;
	for (; a < t.length;) {
		let e = t[a];
		switch (e) {
			case "|":
				n += "|", i = !1, a++;
				continue;
			case "(":
				r++, n += "(", i = !1, a++;
				continue;
			case ")":
				if (r === 0) return null;
				r--, n += ")", i = !0, a++;
				continue;
			case "*":
			case "+":
			case "?":
				if (!i) return null;
				n += e, i = !1, a++;
				continue;
			case "{": {
				let e = i ? O(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = vt(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = gt(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = ht(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = mt(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, bt = 1e3, xt = 1e3, k = 16, St = /^[dgimsuy]*$/, Ct = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, A = class extends Error {}, wt = 0, Tt = 1, Et = 2, Dt = 3, Ot = 4, kt = 5, At = Ie(2, 31) - 1, jt = (e, t) => {
	let n = e.op.length, r = e.scratch ?? {
		clist: new Int32Array(n),
		nlist: new Int32Array(n),
		onList: new Int32Array(n),
		stack: new Int32Array(n),
		atomGen: new Int32Array(e.atoms.length),
		atomHit: new Uint8Array(e.atoms.length),
		gen: 0,
		step: 0
	};
	return e.scratch = void 0, (r.gen > At - t - 2 || r.step > At - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Mt = /* @__PURE__ */ new Set([
	"^",
	"$",
	"\\",
	".",
	"*",
	"+",
	"?",
	"(",
	")",
	"[",
	"]",
	"{",
	"}",
	"|",
	"/"
]), Nt = /^\{(\d+)(?:,(\d*))?\}/, Pt = /^[0-9a-fA-F]{4}/, Ft = /^\(\?([ims]*)(?:-([ims]*))?:/, It = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, Lt = class {
	constructor(e, t, n, r = !1) {
		this.src = e, this.unicode = t, this.iregexp = r, this.i = 0, this.mods = {
			i: n.includes("i"),
			m: n.includes("m"),
			s: n.includes("s")
		};
	}
	atom(e, t) {
		return {
			t: "atom",
			src: e,
			literal: t,
			mods: this.mods
		};
	}
	parse() {
		let e = this.parseAlt();
		if (this.i < this.src.length) throw new A("unexpected character");
		return e;
	}
	parseAlt() {
		let e = [this.parseSeq()];
		for (; this.src[this.i] === "|";) this.i++, e.push(this.parseSeq());
		return e.length === 1 ? e[0] : {
			t: "alt",
			alts: e
		};
	}
	parseSeq() {
		let e = [];
		for (; this.i < this.src.length && this.src[this.i] !== "|" && this.src[this.i] !== ")";) e.push(this.parseTerm());
		return e.length === 1 ? e[0] : {
			t: "cat",
			items: e
		};
	}
	parseTerm() {
		let e = this.src[this.i];
		return e === "^" ? (this.i++, {
			t: "bol",
			multiline: this.mods.m
		}) : e === "$" ? (this.i++, {
			t: "eol",
			multiline: this.mods.m
		}) : this.parseQuantifier(this.parseAtom());
	}
	parseAtom() {
		let { src: e } = this, t = this.i, n = e[t];
		if (n === "(") {
			let n = this.mods;
			if (e[t + 1] === "?") {
				let r = Ft.exec(e.slice(t, t + 12));
				if (!r) throw new A("lookaround or named group");
				let i = Re({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new A("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new A("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new A("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Mt.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new A("trailing backslash");
		if (r === "b" || r === "B") throw new A("word boundary");
		if (r >= "1" && r <= "9") throw new A("backreference");
		if (r === "0") {
			if (n) return 2;
			let r = 2;
			for (; r < 4 && /[0-7]/.test(t[e + r] ?? "");) r++;
			return r;
		}
		if (r === "c") return 3;
		if (r === "x" && /^[0-9a-fA-F]{2}/.test(t.slice(e + 2))) return 4;
		if (n && (r === "p" || r === "P" || r === "u") && t[e + 2] === "{") {
			let n = t.indexOf("}", e + 3);
			if (n === -1) throw new A("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && Pt.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Pt.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
			}
			return 6;
		}
		return 2;
	}
	parseQuantifier(e) {
		let { src: t } = this, n = t[this.i], r, i;
		if (n === "*") r = 0, i = Infinity, this.i++;
		else if (n === "+") r = 1, i = Infinity, this.i++;
		else if (n === "?") r = 0, i = 1, this.i++;
		else if (n === "{") {
			let n = Nt.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > bt || i !== Infinity && i > bt) throw new A("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, Rt = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= bt) throw new A("pattern too large");
		return this.op.push(e), this.x.push(t), this.y.push(n), this.op.length - 1;
	}
	atomId(e) {
		let t = (e.mods.i ? "i" : "") + (e.mods.s ? "s" : "") + (this.unicode ? "u" : ""), n = `${t}/${e.src}`, r = this.atomIds.get(n);
		return r === void 0 && (r = this.atoms.length, this.atoms.push({
			re: RegExp(`^(?:${e.src})$`, t),
			literal: e.mods.i ? void 0 : e.literal
		}), this.atomIds.set(n, r)), r;
	}
	finish() {
		this.emit(kt);
	}
	compile(e) {
		if (++this.work > 4 * bt) throw new A("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(wt, this.atomId(e));
				return;
			case "bol":
				this.emit(Dt, +!!e.multiline);
				return;
			case "eol":
				this.emit(Ot, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(Tt);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Et)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(Tt);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Et, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(Tt);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, zt = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new Lt(e, r, t, n).parse(), a = new Rt(r);
		return a.compile(i), a.finish(), {
			op: a.op,
			x: a.x,
			y: a.y,
			atoms: a.atoms,
			unicode: r,
			sticky: t.includes("y")
		};
	} catch (e) {
		if (e instanceof RangeError) throw e;
		return null;
	}
}, Bt = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: te, atomHit: ne } = r, g = r.gen, _ = r.step;
	r.gen = g + t.length + 2, r.step = _ + t.length + 2;
	let v = 0, y = !1, re = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== g) switch (ee[r] = g, ++c === 64 && (u(c), c = 0), i[r]) {
				case wt:
					e[n++] = r;
					break;
				case kt: return u(c), y = !0, n;
				case Et:
					h[s++] = a[r];
					break;
				case Tt:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case Dt:
					(v === 0 || a[r] === 1 && It(t.charCodeAt(v - 1))) && (h[s++] = r + 1);
					break;
				case Ot: (v === t.length || a[r] === 1 && It(t.charCodeAt(v))) && (h[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (g++, p = re(d, 0, 0), y) return !0;
	for (; v < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(v) : t.charCodeAt(v)) > 65535 ? 2 : 1, n = t.slice(v, v + e), r = _ + v + 1;
		g++, m = 0, v += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (te[i] !== r) {
				te[i] = r;
				let e = s[i];
				ne[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (ne[i] === 1 && (m = re(f, m, t + 1), y)) return !0;
		}
		if (!l && (m = re(f, m, 0), y)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, Vt = (e, t, n) => {
	let r = jt(e, t.length);
	try {
		return Bt(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Ht = 256, Ut = /* @__PURE__ */ new Map(), Wt = 0, Gt = (e, t, n, r, i = !1) => {
	if (e.length > xt || t.length > 7 || !St.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = Ut.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Ct(s) > k ? null : zt(n ? `^(?:${s})$` : s, t, i);
	Wt >= Ht && (Ut.clear(), Wt = 0);
	let l = Ut.get(s);
	return l === void 0 && Ut.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), Wt++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, Kt = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Vt(e, t, n);
}, qt = class {
	constructor(e) {
		this.nodes = e;
	}
}, Jt = (e) => {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\" && n + 1 < e.length) {
			let r = e[n + 1];
			if ((r === "b" || r === "B") && !t) return !0;
			n++;
		} else r === "[" && !t ? t = !0 : r === "]" && t && (t = !1);
	}
	return !1;
}, Yt = (e) => {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") {
			let n = e[t + 1];
			if (n >= "1" && n <= "9") return !1;
			t++;
		} else if (n === "(" && e[t + 1] === "?") {
			let n = e[t + 2];
			if (n === "=" || n === "!") return !1;
			if (n === "<") {
				let n = e[t + 3];
				if (n === "=" || n === "!" || /[a-zA-Z]/.test(n ?? "")) return !1;
			}
		}
	}
	return !Jt(e);
}, Xt = 256, Zt = /* @__PURE__ */ new Map(), Qt = (e, t) => {
	let n = Zt.get(e);
	return n === void 0 && (n = Yt(e), Zt.size >= Xt && Zt.clear(), Zt.set(Array.from(e).join(""), n)), t(e.length), n;
}, $t = /* @__PURE__ */ new Map(), en = (e, t) => {
	let n = $t.get(e);
	return n === void 0 && (n = yt(e), n !== null && (n = Array.from(n).join("")), $t.size >= Xt && $t.clear(), $t.set(Array.from(e).join(""), n)), t(e.length), n;
}, tn = 256, nn = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > xt) c = null;
		else if (o) {
			let n = en(e, i);
			c = n === null ? null : Gt(n, t, r, i, !0);
		} else c = Qt(e, i) ? Gt(e, t, r, i) : null;
		s !== void 0 && (s.size >= tn && s.clear(), s.set(a, c));
	}
	return c !== null && Kt(c, n, i);
}, rn = {
	length: (e, t) => {
		let n = e[0];
		if (E(n)) {
			t(n.length);
			let e = n.length;
			for (let t = 0; t < n.length - 1; t++) {
				let r = n.charCodeAt(t);
				if (r >= 55296 && r <= 56319) {
					let r = n.charCodeAt(t + 1);
					r >= 56320 && r <= 57343 && (e--, t++);
				}
			}
			return e;
		}
		if (w(n)) return C(n);
		if (T(n)) {
			let e = Ke(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !E(r) || !E(i) ? !1 : nn(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !E(r) || !E(i) ? !1 : nn(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, an = (e, t, n = x) => e === void 0 && t === void 0 || He(e, t, n), on = (e, t, n = x) => !He(e, t, n), sn = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, cn = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return sn(n) - sn(i);
	}
	return e.length - t.length;
}, ln = (e, t, n = x) => Ye(e) && Ye(t) ? e < t : E(e) && E(t) ? (n(Math.min(e.length, t.length)), cn(e, t) < 0) : !1, un = (e, t, n = x) => ln(e, t, n) || an(e, t, n), dn = (e, t, n = x) => Ye(e) && Ye(t) ? e > t : E(e) && E(t) ? (n(Math.min(e.length, t.length)), cn(e, t) > 0) : !1, fn = (e, t, n = x) => dn(e, t, n) || an(e, t, n), pn = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, mn = (e, t, n) => {
	let r = C(e);
	for (let i = 0; i < r; i++) {
		let r = Ue(e, i);
		if (n(1 + pn(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, hn = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, gn = (e) => typeof e == "string" && e.length + 1 > We, _n = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = C(e);
	for (let n = 0; n < a; n++) {
		let r = Ue(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), gn(r) ? i.long.push(r) : i.set.add(hn(r));
	}
	return n?.set(e, i), i;
}, vn = ({ set: e, long: t }, n, r) => {
	if (gn(n)) {
		for (let e of t) if (r(1 + pn(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(hn(n)));
}, yn = (e, t, n) => {
	let r = C(e);
	for (let i = 0; i < r; i++) if (n(), S(e, i) && t(e[i])) return !0;
	return !1;
}, bn = {
	eq: an,
	ne: on,
	lt: ln,
	le: un,
	gt: dn,
	ge: fn,
	in: (e, t, n = x) => w(t) ? mn(t, e, n) !== -1 : !1,
	nin: (e, t, n = x) => w(t) ? mn(t, e, n) === -1 : !1,
	subsetof: (e, t, n = x, r) => {
		if (!w(e) || !w(t)) return !1;
		let i = _n(t, n, r);
		return !yn(e, (e) => !vn(i, e, n), n);
	},
	anyof: (e, t, n = x, r) => {
		if (!w(e) || !w(t)) return !1;
		let i = _n(t, n, r);
		return yn(e, (e) => vn(i, e, n), n);
	},
	noneof: (e, t, n = x, r) => {
		if (!w(e) || !w(t)) return !1;
		let i = _n(t, n, r);
		return !yn(e, (e) => vn(i, e, n), n);
	},
	sizeof: (e, t) => !w(e) && !E(e) || !w(t) && !E(t) ? !1 : (w(e) ? C(e) : e.length) === (w(t) ? C(t) : t.length),
	size: (e, t) => !w(e) && !E(e) || !Ye(t) ? !1 : (w(e) ? C(e) : e.length) === t
}, xn = (e) => !w(e) && !E(e) ? !1 : (w(e) ? C(e) : e.length) === 0, Sn = (e, t, n, r = x, i) => !E(e) || !E(t) ? !1 : nn(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), Cn = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), wn = (e, t) => e.concat(`[${t}]`), Tn = (e, t) => e < 0 ? t + e : e, En = (e, t) => {
	let n = C(e), r = Tn(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: S(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, Dn = (e, t) => {
	for (let n of t) e.push(n);
}, On = 1e6, kn = 100, An = 1e6, jn = 20, Mn = 1e4, Nn = 1e4, Pn = class {
	constructor(e) {
		this.weight = 0, this.nodes = 0, this.stringPositions = 0, this.done = !1, this.seen = /* @__PURE__ */ new Set(), this.frames = [], this.visit(e);
	}
	advance(e) {
		let t = this.nodes + e, { frames: n } = this;
		for (; n.length > 0 && this.nodes < t;) {
			let e = n[n.length - 1];
			if (e.i >= e.length) {
				n.pop();
				continue;
			}
			let t = e.i++;
			if (e.keys === null) {
				let n = e.container;
				if (e.indices !== null) {
					let r = Number(e.indices[t]);
					S(n, r) && this.visit(n[r]);
				} else if (S(n, t)) this.visit(n[t]);
				else if (++e.holes > Nn) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!S(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), w(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: C(e),
				i: 0,
				holes: 0
			});
			else if (T(e)) {
				let t = Object.keys(e);
				this.frames.push({
					container: e,
					keys: t,
					indices: null,
					length: t.length,
					i: 0,
					holes: 0
				});
			}
		}
	}
}, Fn = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, Cn(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = Cn(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = C(e);
			for (let r = 0; r < n; r++) this.tick(), S(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Pn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Mn, Math.ceil((this.retained - this.retainedLimit) / jn))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new Be(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(On, kn * e.weight) + t, this.retainedLimit = Math.max(An, jn * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Pn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Mn, Math.ceil((this.steps - this.stepLimit) / kn))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new Be(`Query exceeded ${this.stepLimit} evaluation steps`);
			}
		}, {
			regexProgram: (e) => {
				this.largestRegexProgram = Math.max(this.largestRegexProgram, e);
			},
			regexWork: (e) => {
				this.regexSteps += e, this.tick(e);
			},
			regexSites: /* @__PURE__ */ new Map()
		}), this.readsCurrent = /* @__PURE__ */ new WeakMap(), this.invariantResults = /* @__PURE__ */ new Map(), this.isInvariant = (e) => (this.readsCurrent.has(e) || this.classify(e), !this.readsCurrent.get(e)), this.classify = (e) => {
			let t = this.readsCurrent, n = [], r = (e) => {
				if (typeof e != "object" || !e) return !1;
				let r = t.get(e);
				if (r !== void 0) return r;
				let i = e.type;
				if (i === "current") return t.set(e, !0), !0;
				if (i === "filterExpression" || i === "value") return t.set(e, !1), !1;
				let a = Object.values(e);
				n.push({
					node: e,
					children: a,
					i: 0,
					reads: !1
				});
			};
			for (r(e); n.length > 0;) {
				let e = n[n.length - 1];
				e.i < e.children.length ? r(e.children[e.i++]) === !0 && (e.reads = !0) : (t.set(e.node, e.reads), n.pop(), e.reads && n.length > 0 && (n[n.length - 1].reads = !0));
			}
		}, this.memoInvariant = (e, t) => {
			if (!this.isInvariant(e)) return t();
			if (this.invariantResults.has(e)) return this.invariantResults.get(e);
			let n = t();
			return this.invariantResults.set(e, n), n;
		}, this.handleRootQuery = (e, t) => {
			if (this.rootQueryCache.has(e)) return this.rootQueryCache.get(e);
			let n = this.handleSubscript(this.rootPayload, t);
			return this.rootQueryCache.set(e, n), n;
		}, this.handleIdentifier = (e, t) => this.selectMember(e, t), this.handleStringLiteral = (e, t) => this.selectMember(e, t), this.selectMember = ({ value: e, paths: t }, n) => {
			if (!T(e)) return;
			let r = this.canonicalName(n, n.value);
			if (S(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (w(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: wn(t, r)
					});
				}), n;
			}
			if (T(e)) {
				let n = Ke(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) S(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!w(e)) return;
			let r = En(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: wn(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (w(e)) {
				let r = En(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: wn(t, r.index)
				} : void 0;
			}
			if (T(e)) {
				let r = String(n.value);
				return S(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!w(e)) return [];
			let r = C(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : Tn(n.start, r), o = n.end === null ? r : Tn(n.end, r)) : (a = n.start === null ? r - 1 : Tn(n.start, r), o = n.end === null ? -r - 1 : Tn(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: S(e, u) ? e[u] : void 0,
				paths: wn(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (T(e.value)) {
						let t = this.handleIdentifier(e, r);
						D(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (T(e.value)) {
						let t = this.handleStringLiteral(e, r);
						D(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (w(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						D(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					Dn(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": Dn(n, this.handleBracketExpressionContent(e, r));
			}
			return n;
		}, this.handleDotdot = (e, t) => {
			let n = [];
			return this.collectDotdot(e, t, n), n;
		}, this.collectDotdot = (e, t, n) => {
			let r = t.value, i = [];
			this.tick();
			let a = e;
			for (; a !== void 0;) {
				let e = a.value;
				switch (r.type) {
					case "bracketMember": {
						let e = this.handleBracketMemberContent(a, r.value);
						D(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						Dn(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						Dn(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						D(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (T(e)) {
					let t = Ke(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else w(e) && i.push({
					parent: a,
					keys: null,
					length: C(e),
					i: 0
				});
				for (a = void 0; i.length > 0;) {
					let e = i[i.length - 1];
					if (e.i >= e.length) {
						i.pop();
						continue;
					}
					let t = e.i++;
					if (e.keys === null) {
						this.tick();
						let n = e.parent.value;
						if (!S(n, t)) continue;
						a = {
							value: n[t],
							paths: wn(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!S(n, r)) continue;
						a = {
							value: n[r],
							paths: this.formatStringLiteralPath(e.parent.paths, r)
						};
					}
					break;
				}
			}
		}, this.handleOperationContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "root": return this.handleRootQuery(t, t.next);
				case "current": return this.handleSubscript(e, t.next);
				case "value": return {
					value: t.value,
					paths: e.paths
				};
				case "groupOperation": return this.memoInvariant(t, () => this.handleOperationContent(e, t.value));
				case "functionCall": return {
					value: this.handleFunctionCall(e, t),
					paths: e.paths
				};
				case "operation": {
					let n = [], r = t;
					for (; r.type === "operation";) n.push({
						operator: r.operator,
						right: r.right
					}), r = r.left;
					let i = this.handleOperationContent(e, r)?.value;
					this.tick(n.length);
					for (let t = n.length - 1; t >= 0; t--) {
						let r = this.handleOperationContent(e, n[t].right)?.value;
						if (!Ye(i) || !Ye(r)) i = void 0;
						else switch (n[t].operator) {
							case "plus":
								i += r;
								break;
							case "minus":
								i -= r;
								break;
							case "div":
								i = r === 0 ? void 0 : i / r;
								break;
							case "multi": i *= r;
						}
					}
					return Ye(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return xn(n);
			if (t.operator === "reg") return Sn(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = bn[t.operator];
			if (i) {
				let e = this.isInvariant(t.right) ? this.siteSetCache(t.right) : void 0;
				return i(n, r, this.tick, e);
			}
			return !1;
		}, this.handleLogicalExpression = (e, t) => this.memoInvariant(t, () => this.evaluateLogicalExpression(e, t)), this.evaluateLogicalExpression = (e, t) => {
			let n = [], r = !this.isInvariant(t), i = t;
			for (; i.type === "logicalExpression" && (i === t || !r || !this.isInvariant(i));) n.push({
				operator: i.operator,
				right: i.right
			}), i = i.left;
			this.tick(n.length);
			let a = this.handleFilterExpressionContent(e, i);
			for (let t = n.length - 1; t >= 0; t--) (n[t].operator === "and" ? a : !a) && (a = this.handleFilterExpressionContent(e, n[t].right));
			return a;
		}, this.handleFunctionCall = (e, t) => this.memoInvariant(t, () => this.evaluateFunctionCall(e, t)), this.evaluateFunctionCall = (e, t) => {
			let n = t.name === "count" || t.name === "value", r = t.args.map((t) => {
				let r = this.handleOperationContent(e, t);
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new qt(r.value) : new qt(D(r?.value) ? [r?.value] : []);
			}), i = rn[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
			return i ? i(r, this.tick, o ? t : void 0) : void 0;
		}, this.handleFilterExpressionContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "logicalExpression": return this.handleLogicalExpression(e, t);
				case "comparator": return this.handleComparator(e, t);
				case "groupExpression": return this.memoInvariant(t, () => this.handleFilterExpressionContent(e, t.value));
				case "notExpression": return this.memoInvariant(t, () => !this.handleFilterExpressionContent(e, t.value));
				case "functionCall": return !!this.handleFunctionCall(e, t);
				case "root": {
					let e = this.handleRootQuery(t, t.next);
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : D(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : D(n);
				}
				case "value": return !!t.value;
			}
		}, this.handleBracketMemberContent = (e, t) => {
			switch (t.type) {
				case "identifier": return this.handleIdentifier(e, t);
				case "numericLiteral": return this.handleNumericLiteral(e, t);
				case "stringLiteral": return this.handleStringLiteral(e, t);
			}
		}, this.handleBracketExpressionContent = (e, t) => {
			let n = e.value;
			switch (t.type) {
				case "filterExpression": {
					let r = [];
					if (w(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: wn(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (T(n)) {
						let i = Ke(n);
						this.tick(i.length);
						for (let a of i) {
							if (!S(n, a)) continue;
							let i = {
								value: n[a],
								paths: this.formatStringLiteralPath(e.paths, a)
							};
							this.handleFilterExpressionContent(i, t.value) && (this.retain(), r.push(i));
						}
					}
					return r;
				}
				case "unions": return this.handleUnions(e, t);
				case "wildcard": return this.handleWildcard(e);
				case "slices": return this.handleSlices(e, t);
			}
		}, this.isIndefiniteSegment = (e) => {
			let t = e.value;
			return t.type === "bracketExpression" || t.type === "dotdot" || t.type === "dot" && t.value.type === "wildcard";
		}, this.selectMany = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketExpression": return this.handleBracketExpressionContent(e, n.value);
				case "dotdot": return this.handleDotdot(e, n);
				default: return this.handleWildcard(e);
			}
		}, this.selectOne = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketMember": return this.handleBracketMemberContent(e, n.value);
				case "dot":
					if (n.value.type === "identifier") return this.handleIdentifier(e, n.value);
					if (n.value.type === "numericLiteral") return this.handleDotNumericLiteral(e, n.value);
			}
		}, this.handleSubscript = (e, t) => {
			if (t === null) return e;
			let n = [], r = [{
				node: e,
				segment: t
			}], i = !1;
			for (; r.length > 0;) {
				let { node: e, segment: t } = r.pop(), a;
				if (this.isIndefiniteSegment(t)) i = !0, a = this.selectMany(e, t);
				else {
					this.tick();
					let n = this.selectOne(e, t);
					if (!D(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) Dn(n, a);
				else for (let e = a.length - 1; e >= 0; e--) r.push({
					node: a[e],
					segment: o
				});
			}
			if (!i) return n[0];
			let a = [], o = [];
			for (let e of n) a.push(e.value), o.push(e.paths);
			return {
				value: a,
				paths: o,
				isIndefinite: !0
			};
		}, this.handleRoot = (e) => {
			try {
				return this.handleSubscript(this.rootPayload, e.next);
			} catch (e) {
				throw qe(e) ? new Be("Query is nested too deeply") : Je(e) ? new Be("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? On, this.retainedLimit = this.adaptiveLimit ? An : Infinity;
	}
}, In = (e, t, n) => {
	let r = ct(t), i = new Fn(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? Xe(i) ? [] : [i.value] : i?.value;
}, Ln = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = In(e, i, n);
		D(t) && r.push(t);
	}
	return r;
}, Rn = (e, t, n = {}) => {
	try {
		return w(t) ? Ln(e, t, n) : In(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, zn = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = zn(n, t);
		if (e) return e;
	}
	return null;
}, Bn = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = Rn(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = zn(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
	let a = [...t.filePath ?? []];
	if (a.length === 0) throw Error("destinationPath.filePath must contain the property to write");
	let o = a.pop(), s = a.reduce((e, t) => {
		if (e == null) throw Error(`Cannot resolve destination filePath at: ${t}`);
		return e[t];
	}, i);
	if (s == null) throw Error(`Destination parent not found for filePath: ${t.filePath.join(".")}`);
	return n && console.log("json-write-path v6 resolved:", {
		fileName: t.fileName,
		jsonPath: t.jsonPath,
		dataRole: t.dataRole,
		filePath: t.filePath,
		parent: s,
		key: o
	}), {
		parent: s,
		key: o,
		target: i
	};
}, Vn = (e, t, n, r) => {
	let { parent: i, key: a } = Bn(e, t, r);
	return (je[t.action] || Ae)(i, a, n), e;
}, Hn = (e, t) => {
	if (!e) return null;
	let n = t[e.fileName];
	if (n === void 0) throw Error(`Entry not found in state: ${e.fileName}`);
	if (e.jsonPath) {
		let t = Rn(n, e.jsonPath, { returnArray: !0 });
		return t.length === 0 ? Array.isArray(n) ? n : [] : t.length === 1 ? t[0] : t;
	}
	return Array.isArray(e.filePath) && e.filePath.length > 0 ? e.filePath.reduce((e, t) => e ? e[t] : void 0, n) : n;
}, Un = (e, t, n, r = !1) => {
	if (t) {
		if (!t.filePath || t.filePath.length === 0) {
			let r = e[t.fileName];
			Array.isArray(r) ? r.push(...Array.isArray(n) ? n : [n]) : e[t.fileName] = n;
		} else try {
			Vn(e, t, n, r);
		} catch {}
	}
}, Wn = {
	single: (e, t) => {
		let n = s[e.templateKey], r = Hn(e.sourcePath, t);
		return (e.func === "fromCollection" ? ie : _)(r, n);
	},
	rowOnColumn: (e, { data: t }) => De({
		columns: t?.columns,
		data: t,
		columnSpec: s[e.templateKey.columnKey],
		rowSpec: s[e.templateKey.rowKey]
	}),
	columnOnRow: (e, { data: t }) => Oe({
		columns: t?.columns,
		data: t,
		columnSpec: s[e.templateKey.columnKey],
		rowSpec: s[e.templateKey.rowKey]
	})
}, Gn = (e, t, n = !1) => {
	let r = u[e], i = Wn[r.type](r, t);
	return Un(t, r.destinationPath, i, n), i;
}, Kn = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => (e.forEach((e) => {
	r && console.log(`[runStep] ${e}`), Gn(e, {
		base: t,
		data: n
	}, r);
}), t), qn = (e) => Array.isArray(e) ? e : [e], Jn = (e, t, n) => {
	e[t] = n;
}, Yn = {
	set: Jn,
	push: (e, t, n) => {
		e[t].push(...qn(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...qn(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(qn(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(qn(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, Xn = Object.defineProperty, Zn = Object.getOwnPropertySymbols, Qn = Object.prototype.hasOwnProperty, $n = Object.prototype.propertyIsEnumerable, er = Math.pow, tr = (e, t, n) => t in e ? Xn(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, nr = (e, t) => {
	for (var n in t ||= {}) Qn.call(t, n) && tr(e, n, t[n]);
	if (Zn) for (var n of Zn(t)) $n.call(t, n) && tr(e, n, t[n]);
	return e;
}, rr = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, ir = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, j = () => void 0, ar = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = N(e);
		return r === N(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = ur(e), a = ur(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, or = (e, t, n = j) => {
	let r = [];
	if (!ar(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!ar(sr(e.x, t), sr(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !M(o, i) || !M(a, i)) return !1;
			let s = a[i];
			if (!M(o, i) || !ar(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, M = (e, t) => Object.prototype.hasOwnProperty.call(e, t), sr = (e, t) => M(e, t) ? e[t] : void 0, cr = 16383, lr = 1e3, ur = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > lr) throw new ir(`Member name too long (maximum ${lr} characters)`);
	return t;
}, N = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, dr = (e) => e instanceof RangeError && /call stack/i.test(e.message), P = (e) => Array.isArray(e), fr = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), F = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, pr = (e) => typeof e == "number", I = (e) => typeof e == "string", mr = (e) => e === void 0, L = (e) => e !== void 0;
function hr(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function gr(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function _r(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var vr = class extends SyntaxError {
	constructor(e, t, n, r) {
		super(e), this.expected = t, this.found = n, this.location = r, this.name = "SyntaxError";
	}
	format(e) {
		let t = "Error: " + this.message;
		if (this.location) {
			let n = null, r = e.find((e) => e.source === this.location.source);
			r && (n = r.text.split(/\r\n|\n|\r/g));
			let i = this.location.start, a = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, o = this.location.source + ":" + a.line + ":" + a.column;
			if (n) {
				let e = this.location.end, r = "".padEnd(a.line.toString().length, " "), s = n[i.line - 1], c = (i.line === e.line ? e.column : s.length + 1) - i.column || 1;
				t += "\n --> " + o + "\n" + r + " |\n" + a.line + " | " + s + "\n" + r + " | " + "".padEnd(i.column - 1, " ") + "".padEnd(c, "^");
			} else t += "\n at " + o;
		}
		return t;
	}
	static buildMessage(e, t) {
		function n(e) {
			return e.codePointAt(0).toString(16).toUpperCase();
		}
		let r = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? /* @__PURE__ */ RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
		function i(e) {
			return r ? e.replace(r, (e) => "\\u{" + n(e) + "}") : e;
		}
		function a(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		function o(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		let s = {
			literal(e) {
				return "\"" + a(e.text) + "\"";
			},
			class(e) {
				let t = e.parts.map((e) => Array.isArray(e) ? o(e[0]) + "-" + o(e[1]) : o(e));
				return "[" + (e.inverted ? "^" : "") + t.join("") + "]" + (e.unicode ? "u" : "");
			},
			any() {
				return "any character";
			},
			end() {
				return "end of input";
			},
			other(e) {
				return e.description;
			}
		};
		function c(e) {
			return s[e.type](e);
		}
		function l(e) {
			let t = e.map(c);
			if (t.sort(), t.length > 0) {
				let e = 1;
				for (let n = 1; n < t.length; n++) t[n - 1] !== t[n] && (t[e] = t[n], e++);
				t.length = e;
			}
			switch (t.length) {
				case 1: return t[0];
				case 2: return t[0] + " or " + t[1];
				default: return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
			}
		}
		function u(e) {
			return e ? "\"" + a(e) + "\"" : "end of input";
		}
		return "Expected " + l(e) + " but " + u(t) + " found.";
	}
};
function yr(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Br }, a = Br, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", te = "true", ne = "false", g = "null", _ = /^[,\]]/, v = /^[+\-]/, y = /^[*\/]/, re = /^[a-zA-Z_]/, ie = /^[\x80-\uFFFF_]/, ae = /^[a-zA-Z0-9_]/, oe = /^[0-9@$\-]/, se = /^[^\/\\]/, ce = /^[gimsuy]/, le = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, ue = /^[\uD800-\uDBFF]/, de = /^[\uDC00-\uDFFF]/, b = /^[0-9]/, fe = /^[1-9]/, pe = /^[eE]/, me = /^["\\]/, he = /^['\\]/, ge = /^[ -\uD7FF\uE000-\uFFFF]/, _e = /^[dD]/, ve = /^[89abAB]/, ye = /^[c-fC-F]/, be = /^[0-9a-fA-F]/, xe = /^[ \t\n\r]/, Se = G([",", "]"], !1, !1, !1), Ce = W("length", !1), we = W("count", !1), Te = W("match", !1), Ee = W("search", !1), De = W("value", !1), Oe = G(["+", "-"], !1, !1, !1), ke = G(["*", "/"], !1, !1, !1), Ae = K("string"), je = G([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Me = G([["", "￿"], "_"], !1, !1, !1), Ne = G([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Pe = W("-", !1), Fe = G([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Ie = W("$", !1), Le = W("@", !1), Re = W("..", !1), ze = W(".", !1), Be = W("*", !1), x = W("&&", !1), Ve = W("||", !1), He = W("!", !1), S = W("==", !1), Ue = W("!=", !1), We = W(">=", !1), Ge = W(">", !1), Ke = W("<=", !1), C = W("<", !1), qe = W("=~", !1), w = W("in", !1), Je = W("nin", !1), T = W("subsetof", !1), Ye = W("anyof", !1), E = W("noneof", !1), Xe = W("sizeof", !1), D = W("size", !1), Ze = W("empty", !1), Qe = W("true", !1), $e = W("false", !1), et = W("null", !1), tt = W("{", !1), nt = W("}", !1), rt = W("[", !1), it = W("]", !1), at = W(":", !1), ot = W(",", !1), st = W("(", !1), ct = W(")", !1), lt = W("?", !1), ut = K("regex"), dt = W("/", !1), ft = G(["/", "\\"], !0, !1, !1), pt = W("\\", !1), mt = Pr(), ht = G([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), gt = G([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), _t = G([["\ud800", "\udbff"]], !1, !1, !1), vt = G([["\udc00", "\udfff"]], !1, !1, !1), O = G([["0", "9"]], !1, !1, !1), yt = K("number"), bt = W("0", !1), xt = G([["1", "9"]], !1, !1, !1), k = K("integer"), St = G(["e", "E"], !1, !1, !1), Ct = W("\"", !1), A = W("'", !1), wt = G(["\"", "\\"], !1, !1, !1), Tt = G(["'", "\\"], !1, !1, !1), Et = G([[" ", "퟿"], ["", "￿"]], !1, !1, !1), Dt = W("b", !1), Ot = W("f", !1), kt = W("n", !1), At = W("r", !1), jt = W("t", !1), Mt = W("u", !1), Nt = G(["d", "D"], !1, !1, !1), Pt = G([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Ft = W("\\u", !1), It = G([["c", "f"], ["C", "F"]], !1, !1, !1), Lt = G([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Rt = G([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function zt(e) {
		return {
			type: "root",
			next: hr(e)
		};
	}
	function Bt(e) {
		return e.map((e) => e[1]);
	}
	function Vt(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function Ht(e) {
		return e;
	}
	function Ut(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Wt() {
		return { type: "wildcard" };
	}
	function Gt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Kt() {
		return { type: "wildcard" };
	}
	function qt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Jt(e) {
		return e;
	}
	function Yt(e) {
		return e;
	}
	function Xt(e, t) {
		return t.length > 0 ? {
			type: "bracketExpression",
			value: {
				type: "unions",
				values: [e, ...t.map((e) => e[3])]
			}
		} : {
			type: e.type === "numericLiteral" || e.type === "stringLiteral" || e.type === "identifier" ? "bracketMember" : "bracketExpression",
			value: e
		};
	}
	function Zt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function Qt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function $t(e, t) {
		return _r(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function en(e, t) {
		return _r(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function tn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function nn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function rn(e, t) {
		return t !== null || gr(e);
	}
	function an(e, t) {
		if (t === null) return e;
		let n = t[1];
		return n.operator === "reg" ? {
			type: "comparator",
			operator: "reg",
			left: e,
			right: n.right
		} : n.operator === "empty" ? {
			type: "comparator",
			operator: "empty",
			left: e,
			right: null
		} : {
			type: "comparator",
			operator: n.operator,
			left: e,
			right: n.right
		};
	}
	function on(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function sn(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function cn() {
		return { operator: "empty" };
	}
	function ln() {
		return "eq";
	}
	function un() {
		return "ne";
	}
	function dn() {
		return "le";
	}
	function fn() {
		return "lt";
	}
	function pn() {
		return "ge";
	}
	function mn() {
		return "gt";
	}
	function hn() {
		return "in";
	}
	function gn() {
		return "nin";
	}
	function _n() {
		return "subsetof";
	}
	function vn() {
		return "anyof";
	}
	function yn() {
		return "noneof";
	}
	function bn() {
		return "sizeof";
	}
	function xn() {
		return "size";
	}
	function Sn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function Cn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function wn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Tn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function En(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function Dn() {
		return "length";
	}
	function On() {
		return "count";
	}
	function kn() {
		return "match";
	}
	function An() {
		return "search";
	}
	function jn() {
		return "value";
	}
	function Mn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Nn(e, t) {
		return t.length === 0 ? e : _r(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function Pn(e, t) {
		return t.length === 0 ? e : _r(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function Fn(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function In(e) {
		return {
			type: "root",
			next: hr(e)
		};
	}
	function Ln(e) {
		return {
			type: "current",
			next: hr(e)
		};
	}
	function Rn(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function zn() {
		return { type: "wildcard" };
	}
	function Bn(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Vn(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function Hn(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Un(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Wn(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Gn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function Kn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function qn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Jn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Yn(e) {
		return e;
	}
	function Xn(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Zn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Qn(e, t) {
		return [e, t.value];
	}
	function $n(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function er(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function tr(e) {
		return _a(e);
	}
	function nr(e) {
		return _a(e);
	}
	function rr() {
		return "true";
	}
	function ir() {
		return "false";
	}
	function j() {
		return "null";
	}
	function ar(e) {
		return _a(e);
	}
	function or() {
		return "true";
	}
	function M() {
		return "false";
	}
	function sr() {
		return "null";
	}
	function cr(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function lr(e) {
		return e.join("");
	}
	function ur(e, t) {
		let n = parseFloat(jr());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && Mr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function N() {
		let e = parseInt(jr(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && Mr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function dr(e) {
		return e.join("");
	}
	function P(e) {
		return e.join("");
	}
	function fr(e) {
		return e;
	}
	function F() {
		return "\"";
	}
	function pr(e) {
		return e;
	}
	function I(e) {
		return e;
	}
	function mr() {
		return "'";
	}
	function L(e) {
		return e;
	}
	function yr() {
		return "\\";
	}
	function br() {
		return "/";
	}
	function xr() {
		return "\b";
	}
	function Sr() {
		return "\f";
	}
	function Cr() {
		return "\n";
	}
	function wr() {
		return "\r";
	}
	function Tr() {
		return "	";
	}
	function Er(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function Dr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Or(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let R = t.peg$currPos | 0, z = R, B = [{
		line: 1,
		column: 1
	}], V = R, kr = t.peg$maxFailExpected || [], H = t.peg$silentFails | 0, Ar = /* @__PURE__ */ new Map(), U;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function jr() {
		return e.substring(z, R);
	}
	function Mr(e, t) {
		throw t = t === void 0 ? Lr(z, R) : t, Rr(e, t);
	}
	function Nr(t = R) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function W(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function G(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Pr() {
		return { type: "any" };
	}
	function Fr() {
		return { type: "end" };
	}
	function K(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Ir(t) {
		let n = B[t], r;
		if (n) return n;
		if (t >= B.length) r = B.length - 1;
		else for (r = t; !B[--r];);
		for (n = B[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return B[t] = n, n;
	}
	function Lr(e, t, n) {
		let i = Ir(e), a = Ir(t), o = {
			source: r,
			start: {
				offset: e,
				line: i.line,
				column: i.column
			},
			end: {
				offset: t,
				line: a.line,
				column: a.column
			}
		};
		return n && r && typeof r.offset == "function" && (o.start = r.offset(o.start), o.end = r.offset(o.end)), o;
	}
	function q(e) {
		R < V || (R > V && (V = R, kr = []), kr.push(e));
	}
	function Rr(e, t) {
		return new vr(e, null, null, t);
	}
	function zr(e, t, n) {
		return new vr(vr.buildMessage(e, t), e, t, n);
	}
	function Br() {
		let e, t, r, i;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Vr(), i = ga(), i === n ? (R = e, e = n) : (z = e, e = zt(r))), e;
	}
	function Vr() {
		let e, t, r, i, a;
		for (e = R, t = [], r = R, i = $(), a = Hr(), a === n ? (R = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = R, i = $(), a = Hr(), a === n ? (R = r, r = n) : (i = [i, a], r = i);
		return z = e, t = Bt(t), e = t, e;
	}
	function Hr() {
		let e;
		return e = Wr(), e === n && (e = Ur()), e;
	}
	function Ur() {
		let e, t, r;
		return e = R, t = Ei(), t === n ? (R = e, e = n) : (r = Gr(), r === n ? (R = e, e = n) : (z = e, e = Vt(r))), e === n && (e = R, t = qr(), t !== n && (z = e, t = Ht(t)), e = t), e;
	}
	function Wr() {
		let e, t, r;
		return e = R, t = Ti(), t === n ? (R = e, e = n) : (r = Kr(), r === n ? (R = e, e = n) : (z = e, e = Ut(r))), e;
	}
	function Gr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = Wt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = Gt(t)), e = t), e;
	}
	function Kr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = Kt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = qt(t)), e = t, e === n && (e = R, t = qr(), t !== n && (z = e, t = Jt(t)), e = t)), e;
	}
	function qr() {
		let e, t, r, i;
		return e = R, t = Zi(), t === n ? (R = e, e = n) : ($(), r = Jr(), r === n ? (R = e, e = n) : ($(), i = Qi(), i === n ? (R = e, e = n) : (z = e, e = Yt(r)))), e;
	}
	function Jr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = fi(), t !== n) {
			for (r = [], i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = fi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = fi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Xt(t, r);
		} else R = e, e = n;
		return e;
	}
	function Yr() {
		let t, r, i, a, o, s, c, l, u;
		return t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = ea(), i === n ? (R = t, t = n) : ($(), a = Xr(), a === n ? (R = t, t = n) : ($(), o = X(), o === n ? (R = t, t = n) : (s = R, H++, c = R, l = $(), u = e.charAt(R), _.test(u) ? R++ : (u = n, H === 0 && q(Se)), u === n ? (R = c, c = n) : (l = [l, u], c = l), H--, c === n ? s = n : (R = s, s = void 0), s === n ? (R = t, t = n) : (z = t, t = Zt(a)))))), t === n && (t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = Xr(), i === n ? (R = t, t = n) : (z = t, t = Qt(i)))), t;
	}
	function Xr() {
		let e, t, r, i, a, o, s, c, l = R * 91 + 10, u = Ar.get(l);
		if (u) return R = u.nextPos, u.result;
		if (e = R, t = Zr(), t !== n) {
			for (r = [], i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Zr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Zr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = $t(t, r);
		} else R = e, e = n;
		return Ar.set(l, {
			nextPos: R,
			result: e
		}), e;
	}
	function Zr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = Qr(), t !== n) {
			for (r = [], i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = Qr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = Qr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = en(t, r);
		} else R = e, e = n;
		return e;
	}
	function Qr() {
		let e, t, r, i, a;
		return e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = ea(), r === n ? (R = e, e = n) : ($(), i = Xr(), i === n ? (R = e, e = n) : ($(), a = X(), a === n ? (R = e, e = n) : (z = e, e = tn(i))))), e === n && (e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = ni(), r === n ? (R = e, e = n) : (z = e, e = nn(r))), e === n && (e = $r())), e;
	}
	function $r() {
		let e, t, r, i, a;
		return e = R, t = si(), t === n ? (R = e, e = n) : (r = R, i = $(), a = ei(), a === n ? (R = r, r = n) : (i = [i, a], r = i), r === n && (r = null), z = R, i = rn(t, r), i = i ? void 0 : n, i === n ? (R = e, e = n) : (z = e, e = an(t, r))), e === n && (e = ni()), e;
	}
	function ei() {
		let e, t, r;
		return e = R, t = ti(), t === n ? (R = e, e = n) : ($(), r = si(), r === n ? (R = e, e = n) : (z = e, e = on(t, r))), e === n && (e = R, t = Li(), t === n ? (R = e, e = n) : ($(), r = pi(), r === n ? (R = e, e = n) : (z = e, e = sn(r))), e === n && (e = R, t = Gi(), t !== n && (z = e, t = cn()), e = t)), e;
	}
	function ti() {
		let e, t;
		return e = R, t = ji(), t !== n && (z = e, t = ln()), e = t, e === n && (e = R, t = Mi(), t !== n && (z = e, t = un()), e = t, e === n && (e = R, t = Fi(), t !== n && (z = e, t = dn()), e = t, e === n && (e = R, t = Ii(), t !== n && (z = e, t = fn()), e = t, e === n && (e = R, t = Ni(), t !== n && (z = e, t = pn()), e = t, e === n && (e = R, t = Pi(), t !== n && (z = e, t = mn()), e = t, e === n && (e = R, t = Ri(), t !== n && (z = e, t = hn()), e = t, e === n && (e = R, t = zi(), t !== n && (z = e, t = gn()), e = t, e === n && (e = R, t = Bi(), t !== n && (z = e, t = _n()), e = t, e === n && (e = R, t = Vi(), t !== n && (z = e, t = vn()), e = t, e === n && (e = R, t = Hi(), t !== n && (z = e, t = yn()), e = t, e === n && (e = R, t = Ui(), t !== n && (z = e, t = bn()), e = t, e === n && (e = R, t = Wi(), t !== n && (z = e, t = xn()), e = t)))))))))))), e;
	}
	function ni() {
		let e, t, r, i;
		return e = R, t = ea(), t === n ? (R = e, e = n) : ($(), r = Xr(), r === n ? (R = e, e = n) : ($(), i = X(), i === n ? (R = e, e = n) : (z = e, e = Sn(r)))), e === n && (e = ri(), e === n && (e = ui(), e === n && (e = R, t = Ki(), t !== n && (z = e, t = Cn()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = wn()), e = t, e === n && (e = R, t = Ji(), t !== n && (z = e, t = Tn()), e = t))))), e;
	}
	function ri() {
		let e, t, r, i, a;
		return e = R, t = ii(), t === n ? (R = e, e = n) : (r = ea(), r === n ? (R = e, e = n) : ($(), i = ai(), i === n && (i = null), $(), a = X(), a === n ? (R = e, e = n) : (z = e, e = En(t, i)))), e;
	}
	function ii() {
		let t, r;
		return t = R, e.substr(R, 6) === o ? (r = o, R += 6) : (r = n, H === 0 && q(Ce)), r !== n && (z = t, r = Dn()), t = r, t === n && (t = R, e.substr(R, 5) === s ? (r = s, R += 5) : (r = n, H === 0 && q(we)), r !== n && (z = t, r = On()), t = r, t === n && (t = R, e.substr(R, 5) === c ? (r = c, R += 5) : (r = n, H === 0 && q(Te)), r !== n && (z = t, r = kn()), t = r, t === n && (t = R, e.substr(R, 6) === l ? (r = l, R += 6) : (r = n, H === 0 && q(Ee)), r !== n && (z = t, r = An()), t = r, t === n && (t = R, e.substr(R, 5) === u ? (r = u, R += 5) : (r = n, H === 0 && q(De)), r !== n && (z = t, r = jn()), t = r)))), t;
	}
	function ai() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = oi(), t !== n) {
			for (r = [], i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = oi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = oi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Mn(t, r);
		} else R = e, e = n;
		return e;
	}
	function oi() {
		let e;
		return e = si(), e === n && (e = mi()), e;
	}
	function si() {
		let t, r, i, a, o, s, c, l, u = R * 91 + 21, d = Ar.get(u);
		if (d) return R = d.nextPos, d.result;
		if (t = R, r = ci(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), v.test(s) ? R++ : (s = n, H === 0 && q(Oe)), s === n ? (R = a, a = n) : (c = $(), l = ci(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), v.test(s) ? R++ : (s = n, H === 0 && q(Oe)), s === n ? (R = a, a = n) : (c = $(), l = ci(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = Nn(r, i);
		} else R = t, t = n;
		return Ar.set(u, {
			nextPos: R,
			result: t
		}), t;
	}
	function ci() {
		let t, r, i, a, o, s, c, l;
		if (t = R, r = li(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), y.test(s) ? R++ : (s = n, H === 0 && q(ke)), s === n ? (R = a, a = n) : (c = $(), l = li(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), y.test(s) ? R++ : (s = n, H === 0 && q(ke)), s === n ? (R = a, a = n) : (c = $(), l = li(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = Pn(r, i);
		} else R = t, t = n;
		return t;
	}
	function li() {
		let e, t, r, i;
		return e = R, t = ea(), t === n ? (R = e, e = n) : ($(), r = si(), r === n ? (R = e, e = n) : ($(), i = X(), i === n ? (R = e, e = n) : (z = e, e = Fn(r)))), e === n && (e = ri(), e === n && (e = J(), e === n && (e = ui()))), e;
	}
	function ui() {
		let e, t, r;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Vr(), r === n ? (R = e, e = n) : (z = e, e = In(r))), e === n && (e = R, t = wi(), t === n ? (R = e, e = n) : (r = Vr(), r === n ? (R = e, e = n) : (z = e, e = Ln(r)))), e;
	}
	function di() {
		let e, t, r, i, a, o, s, c, l;
		return e = R, t = R, r = la(), r === n ? (R = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = $i(), r === n ? (R = e, e = n) : (i = $(), a = R, o = la(), o === n ? (R = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = R, s = $i(), s === n ? (R = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), z = e, e = Rn(t, a, o)), e;
	}
	function fi() {
		let e, t;
		return e = Yr(), e === n && (e = di(), e === n && (e = R, t = Di(), t !== n && (z = e, t = zn()), e = t, e === n && (e = R, t = la(), t !== n && (z = e, t = Bn(t)), e = t, e === n && (e = R, t = da(), t !== n && (z = e, t = Vn(t)), e = t, e === n && (e = R, t = bi(), t !== n && (z = e, t = Hn(t)), e = t))))), e;
	}
	function pi() {
		let e, t, r;
		return e = R, t = na(), t === n ? (R = e, e = n) : (r = ra(), z = e, e = Un(t, r)), e;
	}
	function J() {
		let e, t;
		return e = R, t = mi(), t !== n && (z = e, t = Wn(t)), e = t, e === n && (e = R, t = sa(), t !== n && (z = e, t = Gn(t)), e = t, e === n && (e = hi(), e === n && (e = vi(), e === n && (e = R, t = Ki(), t !== n && (z = e, t = Kn()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = qn()), e = t, e === n && (e = R, t = Ji(), t !== n && (z = e, t = Jn()), e = t)))))), e;
	}
	function mi() {
		let e, t;
		return H++, e = R, t = da(), t !== n && (z = e, t = Yn(t)), e = t, H--, e === n && (t = n, H === 0 && q(Ae)), e;
	}
	function hi() {
		let e, t, r, i;
		return e = R, t = Yi(), t === n ? (R = e, e = n) : ($(), r = gi(), r === n && (r = null), $(), i = Xi(), i === n ? (R = e, e = n) : (z = e, e = Xn(r))), e;
	}
	function gi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = _i(), t !== n) {
			for (r = [], i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Zn(t, r);
		} else R = e, e = n;
		return e;
	}
	function _i() {
		let e, t, r, i;
		return e = R, t = da(), t === n ? (R = e, e = n) : ($(), r = $i(), r === n ? (R = e, e = n) : ($(), i = J(), i === n ? (R = e, e = n) : (z = e, e = Qn(t, i)))), e;
	}
	function vi() {
		let e, t, r, i;
		return e = R, t = Zi(), t === n ? (R = e, e = n) : ($(), r = yi(), r === n && (r = null), $(), i = Qi(), i === n ? (R = e, e = n) : (z = e, e = $n(r))), e;
	}
	function yi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = J(), t !== n) {
			for (r = [], i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = J(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Y(), o === n ? (R = i, i = n) : (s = $(), c = J(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = er(t, r);
		} else R = e, e = n;
		return e;
	}
	function bi() {
		let t, r, i, a, o, s;
		if (t = R, r = R, i = R, a = e.charAt(R), re.test(a) ? R++ : (a = n, H === 0 && q(je)), a !== n) {
			for (o = [], s = xi(); s !== n;) o.push(s), s = xi();
			a = [a, o], i = a;
		} else R = i, i = n;
		if (r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = tr(r)), t = r, t === n) {
			if (t = R, r = R, i = [], a = e.charAt(R), ie.test(a) ? R++ : (a = n, H === 0 && q(Me)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(R), ie.test(a) ? R++ : (a = n, H === 0 && q(Me));
			else i = n;
			r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = nr(r)), t = r, t === n && (t = R, r = Ki(), r !== n && (z = t, r = rr()), t = r, t === n && (t = R, r = qi(), r !== n && (z = t, r = ir()), t = r, t === n && (t = R, r = Ji(), r !== n && (z = t, r = j()), t = r)));
		}
		return t;
	}
	function xi() {
		let t, r, i, a;
		return t = e.charAt(R), ae.test(t) ? R++ : (t = n, H === 0 && q(Ne)), t === n && (t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, H === 0 && q(Pe)), r === n ? (R = t, t = n) : (i = R, H++, a = e.charAt(R), oe.test(a) ? R++ : (a = n, H === 0 && q(Fe)), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function Si() {
		let e, t;
		return e = R, t = ia(), t !== n && (z = e, t = ar(t)), e = t, e === n && (e = R, t = Ki(), t !== n && (z = e, t = or()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = M()), e = t, e === n && (e = R, t = Ji(), t !== n && (z = e, t = sr()), e = t))), e;
	}
	function Ci() {
		let t;
		return e.charCodeAt(R) === 36 ? (t = "$", R++) : (t = n, H === 0 && q(Ie)), t;
	}
	function wi() {
		let t;
		return e.charCodeAt(R) === 64 ? (t = "@", R++) : (t = n, H === 0 && q(Le)), t;
	}
	function Ti() {
		let t;
		return e.substr(R, 2) === ".." ? (t = "..", R += 2) : (t = n, H === 0 && q(Re)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(R) === 46 ? (t = ".", R++) : (t = n, H === 0 && q(ze)), t;
	}
	function Di() {
		let t;
		return e.charCodeAt(R) === 42 ? (t = "*", R++) : (t = n, H === 0 && q(Be)), t;
	}
	function Oi() {
		let t;
		return e.substr(R, 2) === "&&" ? (t = "&&", R += 2) : (t = n, H === 0 && q(x)), t;
	}
	function ki() {
		let t;
		return e.substr(R, 2) === "||" ? (t = "||", R += 2) : (t = n, H === 0 && q(Ve)), t;
	}
	function Ai() {
		let t;
		return e.charCodeAt(R) === 33 ? (t = "!", R++) : (t = n, H === 0 && q(He)), t;
	}
	function ji() {
		let t;
		return e.substr(R, 2) === "==" ? (t = "==", R += 2) : (t = n, H === 0 && q(S)), t;
	}
	function Mi() {
		let t;
		return e.substr(R, 2) === "!=" ? (t = "!=", R += 2) : (t = n, H === 0 && q(Ue)), t;
	}
	function Ni() {
		let t;
		return e.substr(R, 2) === ">=" ? (t = ">=", R += 2) : (t = n, H === 0 && q(We)), t;
	}
	function Pi() {
		let t;
		return e.charCodeAt(R) === 62 ? (t = ">", R++) : (t = n, H === 0 && q(Ge)), t;
	}
	function Fi() {
		let t;
		return e.substr(R, 2) === "<=" ? (t = "<=", R += 2) : (t = n, H === 0 && q(Ke)), t;
	}
	function Ii() {
		let t;
		return e.charCodeAt(R) === 60 ? (t = "<", R++) : (t = n, H === 0 && q(C)), t;
	}
	function Li() {
		let t;
		return e.substr(R, 2) === "=~" ? (t = "=~", R += 2) : (t = n, H === 0 && q(qe)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = R, e.substr(R, 2) === "in" ? (r = "in", R += 2) : (r = n, H === 0 && q(w)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = R, e.substr(R, 3) === "nin" ? (r = "nin", R += 3) : (r = n, H === 0 && q(Je)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = R, e.substr(R, 8) === d ? (r = d, R += 8) : (r = n, H === 0 && q(T)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === f ? (r = f, R += 5) : (r = n, H === 0 && q(Ye)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === p ? (r = p, R += 6) : (r = n, H === 0 && q(E)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === m ? (r = m, R += 6) : (r = n, H === 0 && q(Xe)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === ee ? (r = ee, R += 4) : (r = n, H === 0 && q(D)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === h ? (r = h, R += 5) : (r = n, H === 0 && q(Ze)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === te ? (r = te, R += 4) : (r = n, H === 0 && q(Qe)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === ne ? (r = ne, R += 5) : (r = n, H === 0 && q($e)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === g ? (r = g, R += 4) : (r = n, H === 0 && q(et)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(R) === 123 ? (t = "{", R++) : (t = n, H === 0 && q(tt)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(R) === 125 ? (t = "}", R++) : (t = n, H === 0 && q(nt)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(R) === 91 ? (t = "[", R++) : (t = n, H === 0 && q(rt)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(R) === 93 ? (t = "]", R++) : (t = n, H === 0 && q(it)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(R) === 58 ? (t = ":", R++) : (t = n, H === 0 && q(at)), t;
	}
	function Y() {
		let t;
		return e.charCodeAt(R) === 44 ? (t = ",", R++) : (t = n, H === 0 && q(ot)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(R) === 40 ? (t = "(", R++) : (t = n, H === 0 && q(st)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(R) === 41 ? (t = ")", R++) : (t = n, H === 0 && q(ct)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(R) === 63 ? (t = "?", R++) : (t = n, H === 0 && q(lt)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (H++, t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, H === 0 && q(dt)), r !== n) {
			for (i = [], a = e.charAt(R), se.test(a) ? R++ : (a = n, H === 0 && q(ft)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, H === 0 && q(pt)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, H === 0 && q(mt)), s === n ? (R = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(R), se.test(a) ? R++ : (a = n, H === 0 && q(ft)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, H === 0 && q(pt)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, H === 0 && q(mt)), s === n ? (R = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(R) === 47 ? (a = "/", R++) : (a = n, H === 0 && q(dt)), a === n ? (R = t, t = n) : (z = t, t = cr(i));
		} else R = t, t = n;
		return H--, t === n && (r = n, H === 0 && q(ut)), t;
	}
	function ra() {
		let t, r, i;
		for (t = R, r = [], i = e.charAt(R), ce.test(i) ? R++ : (i = n, H === 0 && q(ht)); i !== n;) r.push(i), i = e.charAt(R), ce.test(i) ? R++ : (i = n, H === 0 && q(ht));
		return z = t, r = lr(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = R, r = R, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else R = r, r = n;
		return t = r === n ? r : e.substring(t, R), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(R), le.test(t) ? R++ : (t = n, H === 0 && q(gt)), t === n && (t = R, r = e.charAt(R), ue.test(r) ? R++ : (r = n, H === 0 && q(_t)), r === n ? (R = t, t = n) : (i = e.charAt(R), de.test(i) ? R++ : (i = n, H === 0 && q(vt)), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(R), b.test(t) ? R++ : (t = n, H === 0 && q(O))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (H++, t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, H === 0 && q(Pe)), r === n && (r = null), i = ca(), i !== n) {
			if (a = R, e.charCodeAt(R) === 46 ? (o = ".", R++) : (o = n, H === 0 && q(ze)), o !== n) {
				if (s = [], c = e.charAt(R), b.test(c) ? R++ : (c = n, H === 0 && q(O)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(R), b.test(c) ? R++ : (c = n, H === 0 && q(O));
				else s = n;
				s === n ? (R = a, a = n) : (o = [o, s], a = o);
			} else R = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), z = t, t = ur(a, o);
		} else R = t, t = n;
		return H--, t === n && (r = n, H === 0 && q(yt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(R) === 48 ? (t = "0", R++) : (t = n, H === 0 && q(bt)), t === n) {
			if (t = R, r = e.charAt(R), fe.test(r) ? R++ : (r = n, H === 0 && q(xt)), r !== n) {
				for (i = [], a = e.charAt(R), b.test(a) ? R++ : (a = n, H === 0 && q(O)); a !== n;) i.push(a), a = e.charAt(R), b.test(a) ? R++ : (a = n, H === 0 && q(O));
				r = [r, i], t = r;
			} else R = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (H++, t = R, e.charCodeAt(R) === 48 ? (r = "0", R++) : (r = n, H === 0 && q(bt)), r === n) {
			if (r = R, e.charCodeAt(R) === 45 ? (i = "-", R++) : (i = n, H === 0 && q(Pe)), i === n && (i = null), a = e.charAt(R), fe.test(a) ? R++ : (a = n, H === 0 && q(xt)), a !== n) {
				for (o = [], s = e.charAt(R), b.test(s) ? R++ : (s = n, H === 0 && q(O)); s !== n;) o.push(s), s = e.charAt(R), b.test(s) ? R++ : (s = n, H === 0 && q(O));
				i = [
					i,
					a,
					o
				], r = i;
			} else R = r, r = n;
		}
		return r !== n && (z = t, r = N()), t = r, H--, t === n && (r = n, H === 0 && q(k)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = R, r = e.charAt(R), pe.test(r) ? R++ : (r = n, H === 0 && q(St)), r !== n) {
			if (i = e.charAt(R), v.test(i) ? R++ : (i = n, H === 0 && q(Oe)), i === n && (i = null), a = [], o = e.charAt(R), b.test(o) ? R++ : (o = n, H === 0 && q(O)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(R), b.test(o) ? R++ : (o = n, H === 0 && q(O));
			else a = n;
			a === n ? (R = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else R = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (H++, t = R, e.charCodeAt(R) === 34 ? (r = "\"", R++) : (r = n, H === 0 && q(Ct)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(R) === 34 ? (a = "\"", R++) : (a = n, H === 0 && q(Ct)), a === n ? (R = t, t = n) : (z = t, t = dr(i));
		} else R = t, t = n;
		if (t === n) {
			if (t = R, e.charCodeAt(R) === 39 ? (r = "'", R++) : (r = n, H === 0 && q(A)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(R) === 39 ? (a = "'", R++) : (a = n, H === 0 && q(A)), a === n ? (R = t, t = n) : (z = t, t = P(i));
			} else R = t, t = n;
		}
		return H--, t === n && (r = n, H === 0 && q(Ae)), t;
	}
	function fa() {
		let t, r, i;
		return t = R, r = R, H++, i = e.charAt(R), me.test(i) ? R++ : (i = n, H === 0 && q(wt)), H--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = fr(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(pt)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 34 ? (i = "\"", R++) : (i = n, H === 0 && q(Ct)), i === n ? (R = t, t = n) : (z = t, t = F())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(pt)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = pr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = R, r = R, H++, i = e.charAt(R), he.test(i) ? R++ : (i = n, H === 0 && q(Tt)), H--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = I(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(pt)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 39 ? (i = "'", R++) : (i = n, H === 0 && q(A)), i === n ? (R = t, t = n) : (z = t, t = mr())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(pt)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = L(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(R), ge.test(t) ? R++ : (t = n, H === 0 && q(Et)), t === n && (t = R, r = R, i = e.charAt(R), ue.test(i) ? R++ : (i = n, H === 0 && q(_t)), i === n ? (R = r, r = n) : (a = e.charAt(R), de.test(a) ? R++ : (a = n, H === 0 && q(vt)), a === n ? (R = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, R)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && q(pt)), r !== n && (z = t, r = yr()), t = r, t === n && (t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, H === 0 && q(dt)), r !== n && (z = t, r = br()), t = r, t === n && (t = R, e.charCodeAt(R) === 98 ? (r = "b", R++) : (r = n, H === 0 && q(Dt)), r !== n && (z = t, r = xr()), t = r, t === n && (t = R, e.charCodeAt(R) === 102 ? (r = "f", R++) : (r = n, H === 0 && q(Ot)), r !== n && (z = t, r = Sr()), t = r, t === n && (t = R, e.charCodeAt(R) === 110 ? (r = "n", R++) : (r = n, H === 0 && q(kt)), r !== n && (z = t, r = Cr()), t = r, t === n && (t = R, e.charCodeAt(R) === 114 ? (r = "r", R++) : (r = n, H === 0 && q(At)), r !== n && (z = t, r = wr()), t = r, t === n && (t = R, e.charCodeAt(R) === 116 ? (r = "t", R++) : (r = n, H === 0 && q(jt)), r !== n && (z = t, r = Tr()), t = r, t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, H === 0 && q(Mt)), r === n ? (R = t, t = n) : (i = R, a = R, o = e.charAt(R), _e.test(o) ? R++ : (o = n, H === 0 && q(Nt)), o === n ? (R = a, a = n) : (s = e.charAt(R), ve.test(s) ? R++ : (s = n, H === 0 && q(Pt)), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (e.substr(R, 2) === "\\u" ? (a = "\\u", R += 2) : (a = n, H === 0 && q(Ft)), a === n ? (R = t, t = n) : (o = R, s = R, c = e.charAt(R), _e.test(c) ? R++ : (c = n, H === 0 && q(Nt)), c === n ? (R = s, s = n) : (l = e.charAt(R), ye.test(l) ? R++ : (l = n, H === 0 && q(It)), l === n ? (R = s, s = n) : (u = Z(), u === n ? (R = s, s = n) : (d = Z(), d === n ? (R = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, R), o === n ? (R = t, t = n) : (z = t, t = Er(i, o))))), t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, H === 0 && q(Mt)), r === n ? (R = t, t = n) : (i = R, a = R, o = Z(), o === n ? (R = a, a = n) : (s = Z(), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (z = R, a = Dr(i), a = a ? n : void 0, a === n ? (R = t, t = n) : (z = t, t = Or(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(R), be.test(t) ? R++ : (t = n, H === 0 && q(Lt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(R), ae.test(t) ? R++ : (t = n, H === 0 && q(Ne)), t;
	}
	function $() {
		let t, r;
		for (H++, t = [], r = e.charAt(R), xe.test(r) ? R++ : (r = n, H === 0 && q(Rt)); r !== n;) t.push(r), r = e.charAt(R), xe.test(r) ? R++ : (r = n, H === 0 && q(Rt));
		return H--, t;
	}
	function ga() {
		let t, r;
		return t = R, H++, e.length > R ? (r = e.charAt(R), R++) : (r = n, H === 0 && q(mt)), H--, r === n ? t = void 0 : (R = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && Mr("Member name too long (maximum 1000 characters)"), e;
	}
	U = a();
	let va = U !== n && R === e.length;
	function ya() {
		throw U !== n && R < e.length && q(Fr()), zr(kr, V < e.length ? Nr(V) : null, V < e.length ? Lr(V, V + 1) : Lr(V, V));
	}
	if (t.peg$library) return {
		peg$result: U,
		peg$currPos: R,
		peg$FAILED: n,
		peg$maxFailExpected: kr,
		peg$maxFailPos: V,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return U;
	ya();
}
var br = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), xr = {
	length: {
		args: ["value"],
		logical: !1
	},
	count: {
		args: ["nodes"],
		logical: !1
	},
	value: {
		args: ["nodes"],
		logical: !1
	},
	match: {
		args: ["value", "value"],
		logical: !0
	},
	search: {
		args: ["value", "value"],
		logical: !0
	}
}, Sr = (e) => {
	throw new rr(1, 1, e);
}, Cr = (e) => e.type === "root" || e.type === "current", wr = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function Tr(e) {
	let t = [{
		node: e,
		context: "nodes"
	}], n = (e) => {
		for (let n = e.next; n; n = n.next) {
			let e = n.value;
			if (e.type === "dotdot" && (e = e.value), e.type !== "bracketExpression") continue;
			let r = e.value, i = r.type === "unions" ? r.values : [r];
			for (let e of i) e.type === "filterExpression" && t.push({
				node: e.value,
				context: "test"
			});
		}
	};
	for (; t.length > 0;) {
		let { node: e, context: r } = t.pop();
		if (typeof e != "object" || !e) continue;
		let i = e;
		if (Cr(i)) r === "value" && !wr(i) && Sr("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && Sr(`Expected a query, found ${String(i.type)}`), i.type) {
			case "logicalExpression":
			case "notExpression":
			case "groupExpression":
				i.type === "logicalExpression" ? t.push({
					node: i.left,
					context: "test"
				}, {
					node: i.right,
					context: "test"
				}) : t.push({
					node: i.value,
					context: "test"
				});
				break;
			case "comparator": {
				let e = br.has(i.operator) ? "value" : "any";
				t.push({
					node: i.left,
					context: e
				}), i.operator !== "reg" && t.push({
					node: i.right,
					context: e
				});
				break;
			}
			case "functionCall": {
				let e = i.name, n = xr[e], a = i.args;
				a.length !== n.args.length && Sr(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && Sr(`The result of ${e}() must be compared`), r === "value" && n.logical && Sr(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
					node: e,
					context: n.args[r]
				}));
				break;
			}
			case "operation":
				t.push({
					node: i.left,
					context: "value"
				}, {
					node: i.right,
					context: "value"
				});
				break;
			case "groupOperation":
				t.push({
					node: i.value,
					context: r === "any" ? "any" : "value"
				});
				break;
			case "value": r === "test" && Sr("A literal must be compared");
		}
	}
}
function Er(e) {
	let t;
	try {
		t = yr(e);
	} catch (e) {
		if (dr(e)) throw new rr(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new rr(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new rr(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return Tr(t), t;
}
var Dr = /* @__PURE__ */ new Set([
	"(",
	")",
	"*",
	"+",
	"-",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"n",
	"r",
	"t",
	"{",
	"|",
	"}"
]), Or = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), R = (e) => e >= 55296 && e <= 56319, z = (e) => e >= 56320 && e <= 57343, B = (e) => e !== void 0 && e >= "0" && e <= "9", V = (e, t) => {
	let n = e.charCodeAt(t);
	return R(n) && z(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : R(n) || z(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, kr = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !Dr.has(n) ? null : n === "n" ? {
		text: "\\n",
		length: 2,
		code: 10
	} : n === "r" ? {
		text: "\\r",
		length: 2,
		code: 13
	} : n === "t" ? {
		text: "\\t",
		length: 2,
		code: 9
	} : {
		text: "\\" + n,
		length: 2,
		code: n.charCodeAt(0)
	};
}, H = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return Or.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, Ar = (e, t) => {
	let n = e[t];
	return n === "\\" ? kr(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : V(e, t);
}, U = (e, t) => {
	let n = t + 1, r = "[";
	e[n] === "^" && (r += "^", n++);
	let i = !0;
	for (;;) {
		let a = e[n];
		if (a === void 0) return null;
		if (a === "]") return i ? null : {
			text: r + "]",
			length: n + 1 - t
		};
		if (a === "-") {
			if (!i && e[n + 1] !== "]") return null;
			r += "-", n++, i = !1;
			continue;
		}
		if (i = !1, a === "\\" && (e[n + 1] === "p" || e[n + 1] === "P")) {
			let t = H(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = Ar(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = Ar(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, jr = (e, t) => {
	let n = t + 1, r = n;
	for (; B(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; B(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, Mr = (e) => {
	let t = e, n = "", r = 0, i = !1, a = 0;
	for (; a < t.length;) {
		let e = t[a];
		switch (e) {
			case "|":
				n += "|", i = !1, a++;
				continue;
			case "(":
				r++, n += "(", i = !1, a++;
				continue;
			case ")":
				if (r === 0) return null;
				r--, n += ")", i = !0, a++;
				continue;
			case "*":
			case "+":
			case "?":
				if (!i) return null;
				n += e, i = !1, a++;
				continue;
			case "{": {
				let e = i ? jr(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = U(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = H(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = kr(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = V(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, Nr = 1e3, W = 1e3, G = 16, Pr = /^[dgimsuy]*$/, Fr = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, K = class extends Error {}, Ir = 0, Lr = 1, q = 2, Rr = 3, zr = 4, Br = 5, Vr = er(2, 31) - 1, Hr = (e, t) => {
	let n = e.op.length, r = e.scratch ?? {
		clist: new Int32Array(n),
		nlist: new Int32Array(n),
		onList: new Int32Array(n),
		stack: new Int32Array(n),
		atomGen: new Int32Array(e.atoms.length),
		atomHit: new Uint8Array(e.atoms.length),
		gen: 0,
		step: 0
	};
	return e.scratch = void 0, (r.gen > Vr - t - 2 || r.step > Vr - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Ur = /* @__PURE__ */ new Set([
	"^",
	"$",
	"\\",
	".",
	"*",
	"+",
	"?",
	"(",
	")",
	"[",
	"]",
	"{",
	"}",
	"|",
	"/"
]), Wr = /^\{(\d+)(?:,(\d*))?\}/, Gr = /^[0-9a-fA-F]{4}/, Kr = /^\(\?([ims]*)(?:-([ims]*))?:/, qr = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, Jr = class {
	constructor(e, t, n, r = !1) {
		this.src = e, this.unicode = t, this.iregexp = r, this.i = 0, this.mods = {
			i: n.includes("i"),
			m: n.includes("m"),
			s: n.includes("s")
		};
	}
	atom(e, t) {
		return {
			t: "atom",
			src: e,
			literal: t,
			mods: this.mods
		};
	}
	parse() {
		let e = this.parseAlt();
		if (this.i < this.src.length) throw new K("unexpected character");
		return e;
	}
	parseAlt() {
		let e = [this.parseSeq()];
		for (; this.src[this.i] === "|";) this.i++, e.push(this.parseSeq());
		return e.length === 1 ? e[0] : {
			t: "alt",
			alts: e
		};
	}
	parseSeq() {
		let e = [];
		for (; this.i < this.src.length && this.src[this.i] !== "|" && this.src[this.i] !== ")";) e.push(this.parseTerm());
		return e.length === 1 ? e[0] : {
			t: "cat",
			items: e
		};
	}
	parseTerm() {
		let e = this.src[this.i];
		return e === "^" ? (this.i++, {
			t: "bol",
			multiline: this.mods.m
		}) : e === "$" ? (this.i++, {
			t: "eol",
			multiline: this.mods.m
		}) : this.parseQuantifier(this.parseAtom());
	}
	parseAtom() {
		let { src: e } = this, t = this.i, n = e[t];
		if (n === "(") {
			let n = this.mods;
			if (e[t + 1] === "?") {
				let r = Kr.exec(e.slice(t, t + 12));
				if (!r) throw new K("lookaround or named group");
				let i = nr({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new K("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new K("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new K("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Ur.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new K("trailing backslash");
		if (r === "b" || r === "B") throw new K("word boundary");
		if (r >= "1" && r <= "9") throw new K("backreference");
		if (r === "0") {
			if (n) return 2;
			let r = 2;
			for (; r < 4 && /[0-7]/.test(t[e + r] ?? "");) r++;
			return r;
		}
		if (r === "c") return 3;
		if (r === "x" && /^[0-9a-fA-F]{2}/.test(t.slice(e + 2))) return 4;
		if (n && (r === "p" || r === "P" || r === "u") && t[e + 2] === "{") {
			let n = t.indexOf("}", e + 3);
			if (n === -1) throw new K("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && Gr.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Gr.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
			}
			return 6;
		}
		return 2;
	}
	parseQuantifier(e) {
		let { src: t } = this, n = t[this.i], r, i;
		if (n === "*") r = 0, i = Infinity, this.i++;
		else if (n === "+") r = 1, i = Infinity, this.i++;
		else if (n === "?") r = 0, i = 1, this.i++;
		else if (n === "{") {
			let n = Wr.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > Nr || i !== Infinity && i > Nr) throw new K("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, Yr = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= Nr) throw new K("pattern too large");
		return this.op.push(e), this.x.push(t), this.y.push(n), this.op.length - 1;
	}
	atomId(e) {
		let t = (e.mods.i ? "i" : "") + (e.mods.s ? "s" : "") + (this.unicode ? "u" : ""), n = `${t}/${e.src}`, r = this.atomIds.get(n);
		return r === void 0 && (r = this.atoms.length, this.atoms.push({
			re: RegExp(`^(?:${e.src})$`, t),
			literal: e.mods.i ? void 0 : e.literal
		}), this.atomIds.set(n, r)), r;
	}
	finish() {
		this.emit(Br);
	}
	compile(e) {
		if (++this.work > 4 * Nr) throw new K("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Ir, this.atomId(e));
				return;
			case "bol":
				this.emit(Rr, +!!e.multiline);
				return;
			case "eol":
				this.emit(zr, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(Lr);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(q)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(Lr);
					this.x[t] = t + 1, this.compile(e.node), this.emit(q, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(Lr);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Xr = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new Jr(e, r, t, n).parse(), a = new Yr(r);
		return a.compile(i), a.finish(), {
			op: a.op,
			x: a.x,
			y: a.y,
			atoms: a.atoms,
			unicode: r,
			sticky: t.includes("y")
		};
	} catch (e) {
		if (e instanceof RangeError) throw e;
		return null;
	}
}, Zr = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: te, atomHit: ne } = r, g = r.gen, _ = r.step;
	r.gen = g + t.length + 2, r.step = _ + t.length + 2;
	let v = 0, y = !1, re = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== g) switch (ee[r] = g, ++c === 64 && (u(c), c = 0), i[r]) {
				case Ir:
					e[n++] = r;
					break;
				case Br: return u(c), y = !0, n;
				case q:
					h[s++] = a[r];
					break;
				case Lr:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case Rr:
					(v === 0 || a[r] === 1 && qr(t.charCodeAt(v - 1))) && (h[s++] = r + 1);
					break;
				case zr: (v === t.length || a[r] === 1 && qr(t.charCodeAt(v))) && (h[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (g++, p = re(d, 0, 0), y) return !0;
	for (; v < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(v) : t.charCodeAt(v)) > 65535 ? 2 : 1, n = t.slice(v, v + e), r = _ + v + 1;
		g++, m = 0, v += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (te[i] !== r) {
				te[i] = r;
				let e = s[i];
				ne[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (ne[i] === 1 && (m = re(f, m, t + 1), y)) return !0;
		}
		if (!l && (m = re(f, m, 0), y)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, Qr = (e, t, n) => {
	let r = Hr(e, t.length);
	try {
		return Zr(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, $r = 256, ei = /* @__PURE__ */ new Map(), ti = 0, ni = (e, t, n, r, i = !1) => {
	if (e.length > W || t.length > 7 || !Pr.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = ei.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Fr(s) > G ? null : Xr(n ? `^(?:${s})$` : s, t, i);
	ti >= $r && (ei.clear(), ti = 0);
	let l = ei.get(s);
	return l === void 0 && ei.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), ti++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, ri = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Qr(e, t, n);
}, ii = class {
	constructor(e) {
		this.nodes = e;
	}
}, ai = (e) => {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\" && n + 1 < e.length) {
			let r = e[n + 1];
			if ((r === "b" || r === "B") && !t) return !0;
			n++;
		} else r === "[" && !t ? t = !0 : r === "]" && t && (t = !1);
	}
	return !1;
}, oi = (e) => {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") {
			let n = e[t + 1];
			if (n >= "1" && n <= "9") return !1;
			t++;
		} else if (n === "(" && e[t + 1] === "?") {
			let n = e[t + 2];
			if (n === "=" || n === "!") return !1;
			if (n === "<") {
				let n = e[t + 3];
				if (n === "=" || n === "!" || /[a-zA-Z]/.test(n ?? "")) return !1;
			}
		}
	}
	return !ai(e);
}, si = 256, ci = /* @__PURE__ */ new Map(), li = (e, t) => {
	let n = ci.get(e);
	return n === void 0 && (n = oi(e), ci.size >= si && ci.clear(), ci.set(Array.from(e).join(""), n)), t(e.length), n;
}, ui = /* @__PURE__ */ new Map(), di = (e, t) => {
	let n = ui.get(e);
	return n === void 0 && (n = Mr(e), n !== null && (n = Array.from(n).join("")), ui.size >= si && ui.clear(), ui.set(Array.from(e).join(""), n)), t(e.length), n;
}, fi = 256, pi = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > W) c = null;
		else if (o) {
			let n = di(e, i);
			c = n === null ? null : ni(n, t, r, i, !0);
		} else c = li(e, i) ? ni(e, t, r, i) : null;
		s !== void 0 && (s.size >= fi && s.clear(), s.set(a, c));
	}
	return c !== null && ri(c, n, i);
}, J = {
	length: (e, t) => {
		let n = e[0];
		if (I(n)) {
			t(n.length);
			let e = n.length;
			for (let t = 0; t < n.length - 1; t++) {
				let r = n.charCodeAt(t);
				if (r >= 55296 && r <= 56319) {
					let r = n.charCodeAt(t + 1);
					r >= 56320 && r <= 57343 && (e--, t++);
				}
			}
			return e;
		}
		if (P(n)) return N(n);
		if (F(n)) {
			let e = ur(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !I(r) || !I(i) ? !1 : pi(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !I(r) || !I(i) ? !1 : pi(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, mi = (e, t, n = j) => e === void 0 && t === void 0 || or(e, t, n), hi = (e, t, n = j) => !or(e, t, n), gi = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, _i = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return gi(n) - gi(i);
	}
	return e.length - t.length;
}, vi = (e, t, n = j) => pr(e) && pr(t) ? e < t : I(e) && I(t) ? (n(Math.min(e.length, t.length)), _i(e, t) < 0) : !1, yi = (e, t, n = j) => vi(e, t, n) || mi(e, t, n), bi = (e, t, n = j) => pr(e) && pr(t) ? e > t : I(e) && I(t) ? (n(Math.min(e.length, t.length)), _i(e, t) > 0) : !1, xi = (e, t, n = j) => bi(e, t, n) || mi(e, t, n), Si = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, Ci = (e, t, n) => {
	let r = N(e);
	for (let i = 0; i < r; i++) {
		let r = sr(e, i);
		if (n(1 + Si(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, wi = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, Ti = (e) => typeof e == "string" && e.length + 1 > cr, Ei = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = N(e);
	for (let n = 0; n < a; n++) {
		let r = sr(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), Ti(r) ? i.long.push(r) : i.set.add(wi(r));
	}
	return n?.set(e, i), i;
}, Di = ({ set: e, long: t }, n, r) => {
	if (Ti(n)) {
		for (let e of t) if (r(1 + Si(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(wi(n)));
}, Oi = (e, t, n) => {
	let r = N(e);
	for (let i = 0; i < r; i++) if (n(), M(e, i) && t(e[i])) return !0;
	return !1;
}, ki = {
	eq: mi,
	ne: hi,
	lt: vi,
	le: yi,
	gt: bi,
	ge: xi,
	in: (e, t, n = j) => P(t) ? Ci(t, e, n) !== -1 : !1,
	nin: (e, t, n = j) => P(t) ? Ci(t, e, n) === -1 : !1,
	subsetof: (e, t, n = j, r) => {
		if (!P(e) || !P(t)) return !1;
		let i = Ei(t, n, r);
		return !Oi(e, (e) => !Di(i, e, n), n);
	},
	anyof: (e, t, n = j, r) => {
		if (!P(e) || !P(t)) return !1;
		let i = Ei(t, n, r);
		return Oi(e, (e) => Di(i, e, n), n);
	},
	noneof: (e, t, n = j, r) => {
		if (!P(e) || !P(t)) return !1;
		let i = Ei(t, n, r);
		return !Oi(e, (e) => Di(i, e, n), n);
	},
	sizeof: (e, t) => !P(e) && !I(e) || !P(t) && !I(t) ? !1 : (P(e) ? N(e) : e.length) === (P(t) ? N(t) : t.length),
	size: (e, t) => !P(e) && !I(e) || !pr(t) ? !1 : (P(e) ? N(e) : e.length) === t
}, Ai = (e) => !P(e) && !I(e) ? !1 : (P(e) ? N(e) : e.length) === 0, ji = (e, t, n, r = j, i) => !I(e) || !I(t) ? !1 : pi(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), Mi = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), Ni = (e, t) => e.concat(`[${t}]`), Pi = (e, t) => e < 0 ? t + e : e, Fi = (e, t) => {
	let n = N(e), r = Pi(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: M(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, Ii = (e, t) => {
	for (let n of t) e.push(n);
}, Li = 1e6, Ri = 100, zi = 1e6, Bi = 20, Vi = 1e4, Hi = 1e4, Ui = class {
	constructor(e) {
		this.weight = 0, this.nodes = 0, this.stringPositions = 0, this.done = !1, this.seen = /* @__PURE__ */ new Set(), this.frames = [], this.visit(e);
	}
	advance(e) {
		let t = this.nodes + e, { frames: n } = this;
		for (; n.length > 0 && this.nodes < t;) {
			let e = n[n.length - 1];
			if (e.i >= e.length) {
				n.pop();
				continue;
			}
			let t = e.i++;
			if (e.keys === null) {
				let n = e.container;
				if (e.indices !== null) {
					let r = Number(e.indices[t]);
					M(n, r) && this.visit(n[r]);
				} else if (M(n, t)) this.visit(n[t]);
				else if (++e.holes > Hi) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!M(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), P(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: N(e),
				i: 0,
				holes: 0
			});
			else if (F(e)) {
				let t = Object.keys(e);
				this.frames.push({
					container: e,
					keys: t,
					indices: null,
					length: t.length,
					i: 0,
					holes: 0
				});
			}
		}
	}
}, Wi = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, Mi(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = Mi(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = N(e);
			for (let r = 0; r < n; r++) this.tick(), M(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Ui(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Vi, Math.ceil((this.retained - this.retainedLimit) / Bi))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new ir(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(Li, Ri * e.weight) + t, this.retainedLimit = Math.max(zi, Bi * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Ui(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Vi, Math.ceil((this.steps - this.stepLimit) / Ri))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new ir(`Query exceeded ${this.stepLimit} evaluation steps`);
			}
		}, {
			regexProgram: (e) => {
				this.largestRegexProgram = Math.max(this.largestRegexProgram, e);
			},
			regexWork: (e) => {
				this.regexSteps += e, this.tick(e);
			},
			regexSites: /* @__PURE__ */ new Map()
		}), this.readsCurrent = /* @__PURE__ */ new WeakMap(), this.invariantResults = /* @__PURE__ */ new Map(), this.isInvariant = (e) => (this.readsCurrent.has(e) || this.classify(e), !this.readsCurrent.get(e)), this.classify = (e) => {
			let t = this.readsCurrent, n = [], r = (e) => {
				if (typeof e != "object" || !e) return !1;
				let r = t.get(e);
				if (r !== void 0) return r;
				let i = e.type;
				if (i === "current") return t.set(e, !0), !0;
				if (i === "filterExpression" || i === "value") return t.set(e, !1), !1;
				let a = Object.values(e);
				n.push({
					node: e,
					children: a,
					i: 0,
					reads: !1
				});
			};
			for (r(e); n.length > 0;) {
				let e = n[n.length - 1];
				e.i < e.children.length ? r(e.children[e.i++]) === !0 && (e.reads = !0) : (t.set(e.node, e.reads), n.pop(), e.reads && n.length > 0 && (n[n.length - 1].reads = !0));
			}
		}, this.memoInvariant = (e, t) => {
			if (!this.isInvariant(e)) return t();
			if (this.invariantResults.has(e)) return this.invariantResults.get(e);
			let n = t();
			return this.invariantResults.set(e, n), n;
		}, this.handleRootQuery = (e, t) => {
			if (this.rootQueryCache.has(e)) return this.rootQueryCache.get(e);
			let n = this.handleSubscript(this.rootPayload, t);
			return this.rootQueryCache.set(e, n), n;
		}, this.handleIdentifier = (e, t) => this.selectMember(e, t), this.handleStringLiteral = (e, t) => this.selectMember(e, t), this.selectMember = ({ value: e, paths: t }, n) => {
			if (!F(e)) return;
			let r = this.canonicalName(n, n.value);
			if (M(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (P(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: Ni(t, r)
					});
				}), n;
			}
			if (F(e)) {
				let n = ur(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) M(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!P(e)) return;
			let r = Fi(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: Ni(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (P(e)) {
				let r = Fi(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: Ni(t, r.index)
				} : void 0;
			}
			if (F(e)) {
				let r = String(n.value);
				return M(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!P(e)) return [];
			let r = N(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : Pi(n.start, r), o = n.end === null ? r : Pi(n.end, r)) : (a = n.start === null ? r - 1 : Pi(n.start, r), o = n.end === null ? -r - 1 : Pi(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: M(e, u) ? e[u] : void 0,
				paths: Ni(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (F(e.value)) {
						let t = this.handleIdentifier(e, r);
						L(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (F(e.value)) {
						let t = this.handleStringLiteral(e, r);
						L(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (P(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						L(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					Ii(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": Ii(n, this.handleBracketExpressionContent(e, r));
			}
			return n;
		}, this.handleDotdot = (e, t) => {
			let n = [];
			return this.collectDotdot(e, t, n), n;
		}, this.collectDotdot = (e, t, n) => {
			let r = t.value, i = [];
			this.tick();
			let a = e;
			for (; a !== void 0;) {
				let e = a.value;
				switch (r.type) {
					case "bracketMember": {
						let e = this.handleBracketMemberContent(a, r.value);
						L(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						Ii(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						Ii(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						L(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (F(e)) {
					let t = ur(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else P(e) && i.push({
					parent: a,
					keys: null,
					length: N(e),
					i: 0
				});
				for (a = void 0; i.length > 0;) {
					let e = i[i.length - 1];
					if (e.i >= e.length) {
						i.pop();
						continue;
					}
					let t = e.i++;
					if (e.keys === null) {
						this.tick();
						let n = e.parent.value;
						if (!M(n, t)) continue;
						a = {
							value: n[t],
							paths: Ni(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!M(n, r)) continue;
						a = {
							value: n[r],
							paths: this.formatStringLiteralPath(e.parent.paths, r)
						};
					}
					break;
				}
			}
		}, this.handleOperationContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "root": return this.handleRootQuery(t, t.next);
				case "current": return this.handleSubscript(e, t.next);
				case "value": return {
					value: t.value,
					paths: e.paths
				};
				case "groupOperation": return this.memoInvariant(t, () => this.handleOperationContent(e, t.value));
				case "functionCall": return {
					value: this.handleFunctionCall(e, t),
					paths: e.paths
				};
				case "operation": {
					let n = [], r = t;
					for (; r.type === "operation";) n.push({
						operator: r.operator,
						right: r.right
					}), r = r.left;
					let i = this.handleOperationContent(e, r)?.value;
					this.tick(n.length);
					for (let t = n.length - 1; t >= 0; t--) {
						let r = this.handleOperationContent(e, n[t].right)?.value;
						if (!pr(i) || !pr(r)) i = void 0;
						else switch (n[t].operator) {
							case "plus":
								i += r;
								break;
							case "minus":
								i -= r;
								break;
							case "div":
								i = r === 0 ? void 0 : i / r;
								break;
							case "multi": i *= r;
						}
					}
					return pr(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return Ai(n);
			if (t.operator === "reg") return ji(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = ki[t.operator];
			if (i) {
				let e = this.isInvariant(t.right) ? this.siteSetCache(t.right) : void 0;
				return i(n, r, this.tick, e);
			}
			return !1;
		}, this.handleLogicalExpression = (e, t) => this.memoInvariant(t, () => this.evaluateLogicalExpression(e, t)), this.evaluateLogicalExpression = (e, t) => {
			let n = [], r = !this.isInvariant(t), i = t;
			for (; i.type === "logicalExpression" && (i === t || !r || !this.isInvariant(i));) n.push({
				operator: i.operator,
				right: i.right
			}), i = i.left;
			this.tick(n.length);
			let a = this.handleFilterExpressionContent(e, i);
			for (let t = n.length - 1; t >= 0; t--) (n[t].operator === "and" ? a : !a) && (a = this.handleFilterExpressionContent(e, n[t].right));
			return a;
		}, this.handleFunctionCall = (e, t) => this.memoInvariant(t, () => this.evaluateFunctionCall(e, t)), this.evaluateFunctionCall = (e, t) => {
			let n = t.name === "count" || t.name === "value", r = t.args.map((t) => {
				let r = this.handleOperationContent(e, t);
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new ii(r.value) : new ii(L(r?.value) ? [r?.value] : []);
			}), i = J[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
			return i ? i(r, this.tick, o ? t : void 0) : void 0;
		}, this.handleFilterExpressionContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "logicalExpression": return this.handleLogicalExpression(e, t);
				case "comparator": return this.handleComparator(e, t);
				case "groupExpression": return this.memoInvariant(t, () => this.handleFilterExpressionContent(e, t.value));
				case "notExpression": return this.memoInvariant(t, () => !this.handleFilterExpressionContent(e, t.value));
				case "functionCall": return !!this.handleFunctionCall(e, t);
				case "root": {
					let e = this.handleRootQuery(t, t.next);
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : L(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : L(n);
				}
				case "value": return !!t.value;
			}
		}, this.handleBracketMemberContent = (e, t) => {
			switch (t.type) {
				case "identifier": return this.handleIdentifier(e, t);
				case "numericLiteral": return this.handleNumericLiteral(e, t);
				case "stringLiteral": return this.handleStringLiteral(e, t);
			}
		}, this.handleBracketExpressionContent = (e, t) => {
			let n = e.value;
			switch (t.type) {
				case "filterExpression": {
					let r = [];
					if (P(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: Ni(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (F(n)) {
						let i = ur(n);
						this.tick(i.length);
						for (let a of i) {
							if (!M(n, a)) continue;
							let i = {
								value: n[a],
								paths: this.formatStringLiteralPath(e.paths, a)
							};
							this.handleFilterExpressionContent(i, t.value) && (this.retain(), r.push(i));
						}
					}
					return r;
				}
				case "unions": return this.handleUnions(e, t);
				case "wildcard": return this.handleWildcard(e);
				case "slices": return this.handleSlices(e, t);
			}
		}, this.isIndefiniteSegment = (e) => {
			let t = e.value;
			return t.type === "bracketExpression" || t.type === "dotdot" || t.type === "dot" && t.value.type === "wildcard";
		}, this.selectMany = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketExpression": return this.handleBracketExpressionContent(e, n.value);
				case "dotdot": return this.handleDotdot(e, n);
				default: return this.handleWildcard(e);
			}
		}, this.selectOne = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketMember": return this.handleBracketMemberContent(e, n.value);
				case "dot":
					if (n.value.type === "identifier") return this.handleIdentifier(e, n.value);
					if (n.value.type === "numericLiteral") return this.handleDotNumericLiteral(e, n.value);
			}
		}, this.handleSubscript = (e, t) => {
			if (t === null) return e;
			let n = [], r = [{
				node: e,
				segment: t
			}], i = !1;
			for (; r.length > 0;) {
				let { node: e, segment: t } = r.pop(), a;
				if (this.isIndefiniteSegment(t)) i = !0, a = this.selectMany(e, t);
				else {
					this.tick();
					let n = this.selectOne(e, t);
					if (!L(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) Ii(n, a);
				else for (let e = a.length - 1; e >= 0; e--) r.push({
					node: a[e],
					segment: o
				});
			}
			if (!i) return n[0];
			let a = [], o = [];
			for (let e of n) a.push(e.value), o.push(e.paths);
			return {
				value: a,
				paths: o,
				isIndefinite: !0
			};
		}, this.handleRoot = (e) => {
			try {
				return this.handleSubscript(this.rootPayload, e.next);
			} catch (e) {
				throw dr(e) ? new ir("Query is nested too deeply") : fr(e) ? new ir("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? Li, this.retainedLimit = this.adaptiveLimit ? zi : Infinity;
	}
}, Gi = (e, t, n) => {
	let r = Er(t), i = new Wi(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? mr(i) ? [] : [i.value] : i?.value;
}, Ki = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Gi(e, i, n);
		L(t) && r.push(t);
	}
	return r;
}, qi = (e, t, n = {}) => {
	try {
		return P(t) ? Ki(e, t, n) : Gi(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Ji = (e) => typeof e == "object" && !!e && !Array.isArray(e), Yi = (e, t) => {
	if (!Ji(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = X(t, i);
	return n;
}, Xi = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => X(t, e));
}, Zi = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, Qi = (e, t) => Zi(e, t), $i = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Y = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, ea = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Y,
		applyTemplate: e
	});
}, X = (e, t, n) => {
	let r = e, i = t;
	$i(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Zi(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = Qi(a?.textContent, r)), "attributes" in a && (a.attributes = Yi(a?.attributes, r)), "children" in a && (a.children = Xi(a?.children, r))), a);
};
ea(X);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var ta = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, na = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
};
((e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: na,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
})((e, t) => {
	let n = e;
	return ta(n, t), n.map((e) => X(e, e[t]));
}, (e, t) => {
	let n = e, r = t;
	return ta(n, r), n.map((e) => X(e, r));
});
// node_modules/json-transformer-funcs/src/v24/findByRole.js
var ra = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = ra(n, t);
		if (e) return e;
	}
	return null;
}, ia = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = qi(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = ra(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
	let a = [...t.filePath ?? []];
	if (a.length === 0) throw Error("destinationPath.filePath must contain the property to write");
	let o = a.pop(), s = a.reduce((e, t) => {
		if (e == null) throw Error(`Cannot resolve destination filePath at: ${t}`);
		return e[t];
	}, i);
	if (s == null) throw Error(`Destination parent not found for filePath: ${t.filePath.join(".")}`);
	return n && console.log("json-write-path v6 resolved:", {
		fileName: t.fileName,
		jsonPath: t.jsonPath,
		dataRole: t.dataRole,
		filePath: t.filePath,
		parent: s,
		key: o
	}), {
		parent: s,
		key: o,
		target: i
	};
}, aa = (e, t, n, r) => {
	let { parent: i, key: a } = ia(e, t, r);
	return (Yn[t.action] || Jn)(i, a, n), e;
}, oa = (e) => typeof e == "object" && !!e && !Array.isArray(e), sa = (e, t) => {
	if (!oa(e)) return null;
	if (e[t] !== void 0) return e[t];
	let n = `show${t.charAt(0).toUpperCase()}${t.slice(1)}`;
	return e[n] === void 0 ? null : e[n];
}, ca = (e, n) => {
	let r = i[e];
	if (r) for (let e of r) {
		if (e.skipIf && qi(n, e.skipIf, { returnArray: !0 }).length > 0) continue;
		let r = t[e.templateKey];
		try {
			aa({ base: n }, e.destinationPath, r);
		} catch {}
	}
}, la = ({ options: e = {}, optionDefs: t = {}, base: n, showLog: r = !1 } = {}) => {
	if (!n || !oa(e) || !oa(t)) return n;
	for (let [r, i] of Object.entries(t)) {
		if (!oa(i)) continue;
		let t = sa(e, r);
		if (!t) continue;
		let a = typeof t == "boolean" && t === !0, o = oa(t);
		if ((a || o) && Object.entries(i).some(([e]) => e !== "initialize" && (a || t[e] === !0))) {
			i.initialize && ca(i.initialize, n);
			for (let [e, r] of Object.entries(i)) e !== "initialize" && (a || t[e] === !0) && ca(r, n);
		}
	}
	return n;
}, ua = {
	name: "json-renderers-run-instructions",
	version: "1.14.1"
}, da = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.render = {
		meta: ua,
		renderFunc: e
	});
}, fa = ({ instructionMainKey: n, instructionSubKey: r, data: i, options: a, showLog: o = !1 } = {}) => {
	let s = e[n]?.[r];
	if (!s) throw Error(`Definition not found: ${n}.${r}`);
	let c = structuredClone(t[s.baseFromSpec]);
	return Kn({
		instructions: s.instructions ?? [],
		base: c,
		data: i,
		showLog: o
	}), la({
		options: a,
		optionDefs: s.options && typeof s.options == "object" ? s.options : e[n]?.options ?? {},
		base: c,
		data: i,
		showLog: o
	}), c;
};
da(fa);
export { fa as default };
