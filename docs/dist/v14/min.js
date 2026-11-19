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
// ../json-renderers-run-instructions-steps/node_modules/json-write-path/src/v4/utils/toArray.js
var f = (e) => Array.isArray(e) ? e : [e], p = (e, t, n) => {
	e[t] = n;
}, m = {
	set: p,
	push: (e, t, n) => {
		e[t].push(...f(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...f(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(f(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(f(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, ee = Object.defineProperty, h = Object.getOwnPropertySymbols, te = Object.prototype.hasOwnProperty, ne = Object.prototype.propertyIsEnumerable, g = Math.pow, re = (e, t, n) => t in e ? ee(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, _ = (e, t) => {
	for (var n in t ||= {}) te.call(t, n) && re(e, n, t[n]);
	if (h) for (var n of h(t)) ne.call(t, n) && re(e, n, t[n]);
	return e;
}, v = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, y = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, b = () => void 0, ie = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = S(e);
		return r === S(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = le(e), a = le(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, ae = (e, t, n = b) => {
	let r = [];
	if (!ie(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!ie(oe(e.x, t), oe(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !x(o, i) || !x(a, i)) return !1;
			let s = a[i];
			if (!x(o, i) || !ie(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, x = (e, t) => Object.prototype.hasOwnProperty.call(e, t), oe = (e, t) => x(e, t) ? e[t] : void 0, se = 16383, ce = 1e3, le = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > ce) throw new y(`Member name too long (maximum ${ce} characters)`);
	return t;
}, S = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, ue = (e) => e instanceof RangeError && /call stack/i.test(e.message), C = (e) => Array.isArray(e), de = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), w = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, fe = (e) => typeof e == "number", T = (e) => typeof e == "string", pe = (e) => e === void 0, E = (e) => e !== void 0;
function me(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function he(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function ge(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var _e = class extends SyntaxError {
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
function ve(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: zr }, a = zr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", te = "true", ne = "false", g = "null", re = /^[,\]]/, _ = /^[+\-]/, v = /^[*\/]/, y = /^[a-zA-Z_]/, b = /^[\x80-\uFFFF_]/, ie = /^[a-zA-Z0-9_]/, ae = /^[0-9@$\-]/, x = /^[^\/\\]/, oe = /^[gimsuy]/, se = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, ce = /^[\uD800-\uDBFF]/, le = /^[\uDC00-\uDFFF]/, S = /^[0-9]/, ue = /^[1-9]/, C = /^[eE]/, de = /^["\\]/, w = /^['\\]/, fe = /^[ -\uD7FF\uE000-\uFFFF]/, T = /^[dD]/, pe = /^[89abAB]/, E = /^[c-fC-F]/, ve = /^[0-9a-fA-F]/, ye = /^[ \t\n\r]/, be = q([",", "]"], !1, !1, !1), xe = K("length", !1), Se = K("count", !1), Ce = K("match", !1), we = K("search", !1), Te = K("value", !1), Ee = q(["+", "-"], !1, !1, !1), De = q(["*", "/"], !1, !1, !1), Oe = Pr("string"), ke = q([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Ae = q([["", "￿"], "_"], !1, !1, !1), je = q([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Me = K("-", !1), Ne = q([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Pe = K("$", !1), Fe = K("@", !1), Ie = K("..", !1), Le = K(".", !1), Re = K("*", !1), ze = K("&&", !1), Be = K("||", !1), Ve = K("!", !1), He = K("==", !1), D = K("!=", !1), Ue = K(">=", !1), We = K(">", !1), Ge = K("<=", !1), Ke = K("<", !1), qe = K("=~", !1), Je = K("in", !1), Ye = K("nin", !1), Xe = K("subsetof", !1), Ze = K("anyof", !1), Qe = K("noneof", !1), $e = K("sizeof", !1), et = K("size", !1), tt = K("empty", !1), nt = K("true", !1), rt = K("false", !1), it = K("null", !1), at = K("{", !1), ot = K("}", !1), st = K("[", !1), ct = K("]", !1), lt = K(":", !1), ut = K(",", !1), dt = K("(", !1), ft = K(")", !1), pt = K("?", !1), mt = Pr("regex"), ht = K("/", !1), gt = q(["/", "\\"], !0, !1, !1), _t = K("\\", !1), vt = Mr(), O = q([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), yt = q([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), bt = q([["\ud800", "\udbff"]], !1, !1, !1), xt = q([["\udc00", "\udfff"]], !1, !1, !1), k = q([["0", "9"]], !1, !1, !1), St = Pr("number"), Ct = K("0", !1), wt = q([["1", "9"]], !1, !1, !1), Tt = Pr("integer"), Et = q(["e", "E"], !1, !1, !1), Dt = K("\"", !1), Ot = K("'", !1), kt = q(["\"", "\\"], !1, !1, !1), At = q(["'", "\\"], !1, !1, !1), jt = q([[" ", "퟿"], ["", "￿"]], !1, !1, !1), Mt = K("b", !1), Nt = K("f", !1), Pt = K("n", !1), Ft = K("r", !1), It = K("t", !1), Lt = K("u", !1), Rt = q(["d", "D"], !1, !1, !1), zt = q([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Bt = K("\\u", !1), Vt = q([["c", "f"], ["C", "F"]], !1, !1, !1), Ht = q([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Ut = q([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Wt(e) {
		return {
			type: "root",
			next: me(e)
		};
	}
	function Gt(e) {
		return e.map((e) => e[1]);
	}
	function Kt(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function qt(e) {
		return e;
	}
	function Jt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Yt() {
		return { type: "wildcard" };
	}
	function Xt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Zt() {
		return { type: "wildcard" };
	}
	function Qt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function $t(e) {
		return e;
	}
	function en(e) {
		return e;
	}
	function tn(e, t) {
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
	function nn(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function rn(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function an(e, t) {
		return ge(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function on(e, t) {
		return ge(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function sn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function cn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function ln(e, t) {
		return t !== null || he(e);
	}
	function A(e, t) {
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
		return t.length === 0 ? e : ge(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function Rn(e, t) {
		return t.length === 0 ? e : ge(e, t, (e, t) => ({
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
			next: me(e)
		};
	}
	function j(e) {
		return {
			type: "current",
			next: me(e)
		};
	}
	function Vn(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Hn() {
		return { type: "wildcard" };
	}
	function M(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Un(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function Wn(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Gn(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function Kn(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function N(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function qn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function P() {
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
	function F(e) {
		return e;
	}
	function Yn(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function I(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Xn(e, t) {
		return [e, t.value];
	}
	function L(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function Zn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function Qn(e) {
		return _a(e);
	}
	function $n(e) {
		return _a(e);
	}
	function er() {
		return "true";
	}
	function tr() {
		return "false";
	}
	function nr() {
		return "null";
	}
	function rr(e) {
		return _a(e);
	}
	function ir() {
		return "true";
	}
	function ar() {
		return "false";
	}
	function or() {
		return "null";
	}
	function sr(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function cr(e) {
		return e.join("");
	}
	function lr(e, t) {
		let n = parseFloat(kr());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && Ar("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function ur() {
		let e = parseInt(kr(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && Ar("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function dr(e) {
		return e.join("");
	}
	function fr(e) {
		return e.join("");
	}
	function pr(e) {
		return e;
	}
	function mr() {
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
	function R(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function Er(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Dr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let z = t.peg$currPos | 0, B = z, V = [{
		line: 1,
		column: 1
	}], H = z, U = t.peg$maxFailExpected || [], W = t.peg$silentFails | 0, Or = /* @__PURE__ */ new Map(), G;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function kr() {
		return e.substring(B, z);
	}
	function Ar(e, t) {
		throw t = t === void 0 ? Ir(B, z) : t, Lr(e, t);
	}
	function jr(t = z) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function K(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function q(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Mr() {
		return { type: "any" };
	}
	function Nr() {
		return { type: "end" };
	}
	function Pr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Fr(t) {
		let n = V[t], r;
		if (n) return n;
		if (t >= V.length) r = V.length - 1;
		else for (r = t; !V[--r];);
		for (n = V[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return V[t] = n, n;
	}
	function Ir(e, t, n) {
		let i = Fr(e), a = Fr(t), o = {
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
	function J(e) {
		z < H || (z > H && (H = z, U = []), U.push(e));
	}
	function Lr(e, t) {
		return new _e(e, null, null, t);
	}
	function Rr(e, t, n) {
		return new _e(_e.buildMessage(e, t), e, t, n);
	}
	function zr() {
		let e, t, r, i;
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = Br(), i = ga(), i === n ? (z = e, e = n) : (B = e, e = Wt(r))), e;
	}
	function Br() {
		let e, t, r, i, a;
		for (e = z, t = [], r = z, i = $(), a = Vr(), a === n ? (z = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = z, i = $(), a = Vr(), a === n ? (z = r, r = n) : (i = [i, a], r = i);
		return B = e, t = Gt(t), e = t, e;
	}
	function Vr() {
		let e;
		return e = Ur(), e === n && (e = Hr()), e;
	}
	function Hr() {
		let e, t, r;
		return e = z, t = Ti(), t === n ? (z = e, e = n) : (r = Wr(), r === n ? (z = e, e = n) : (B = e, e = Kt(r))), e === n && (e = z, t = Kr(), t !== n && (B = e, t = qt(t)), e = t), e;
	}
	function Ur() {
		let e, t, r;
		return e = z, t = wi(), t === n ? (z = e, e = n) : (r = Gr(), r === n ? (z = e, e = n) : (B = e, e = Jt(r))), e;
	}
	function Wr() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = Yt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = Xt(t)), e = t), e;
	}
	function Gr() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = Zt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = Qt(t)), e = t, e === n && (e = z, t = Kr(), t !== n && (B = e, t = $t(t)), e = t)), e;
	}
	function Kr() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = qr(), r === n ? (z = e, e = n) : ($(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = en(r)))), e;
	}
	function qr() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = di(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = di(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = di(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = tn(t, r);
		} else z = e, e = n;
		return e;
	}
	function Jr() {
		let t, r, i, a, o, s, c, l, u;
		return t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = $i(), i === n ? (z = t, t = n) : ($(), a = Yr(), a === n ? (z = t, t = n) : ($(), o = ea(), o === n ? (z = t, t = n) : (s = z, W++, c = z, l = $(), u = e.charAt(z), re.test(u) ? z++ : (u = n, W === 0 && J(be)), u === n ? (z = c, c = n) : (l = [l, u], c = l), W--, c === n ? s = n : (z = s, s = void 0), s === n ? (z = t, t = n) : (B = t, t = nn(a)))))), t === n && (t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = Yr(), i === n ? (z = t, t = n) : (B = t, t = rn(i)))), t;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c, l = z * 91 + 10, u = Or.get(l);
		if (u) return z = u.nextPos, u.result;
		if (e = z, t = Xr(), t !== n) {
			for (r = [], i = z, a = $(), o = Oi(), o === n ? (z = i, i = n) : (s = $(), c = Xr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = Oi(), o === n ? (z = i, i = n) : (s = $(), c = Xr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = an(t, r);
		} else z = e, e = n;
		return Or.set(l, {
			nextPos: z,
			result: e
		}), e;
	}
	function Xr() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = Zr(), t !== n) {
			for (r = [], i = z, a = $(), o = Di(), o === n ? (z = i, i = n) : (s = $(), c = Zr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = Di(), o === n ? (z = i, i = n) : (s = $(), c = Zr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = on(t, r);
		} else z = e, e = n;
		return e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = $i(), r === n ? (z = e, e = n) : ($(), i = Yr(), i === n ? (z = e, e = n) : ($(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = sn(i))))), e === n && (e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = ti(), r === n ? (z = e, e = n) : (B = e, e = cn(r))), e === n && (e = Qr())), e;
	}
	function Qr() {
		let e, t, r, i, a;
		return e = z, t = oi(), t === n ? (z = e, e = n) : (r = z, i = $(), a = $r(), a === n ? (z = r, r = n) : (i = [i, a], r = i), r === n && (r = null), B = z, i = ln(t, r), i = i ? void 0 : n, i === n ? (z = e, e = n) : (B = e, e = A(t, r))), e === n && (e = ti()), e;
	}
	function $r() {
		let e, t, r;
		return e = z, t = ei(), t === n ? (z = e, e = n) : ($(), r = oi(), r === n ? (z = e, e = n) : (B = e, e = un(t, r))), e === n && (e = z, t = Ii(), t === n ? (z = e, e = n) : ($(), r = fi(), r === n ? (z = e, e = n) : (B = e, e = dn(r))), e === n && (e = z, t = Wi(), t !== n && (B = e, t = fn()), e = t)), e;
	}
	function ei() {
		let e, t;
		return e = z, t = Ai(), t !== n && (B = e, t = pn()), e = t, e === n && (e = z, t = ji(), t !== n && (B = e, t = mn()), e = t, e === n && (e = z, t = Pi(), t !== n && (B = e, t = hn()), e = t, e === n && (e = z, t = Fi(), t !== n && (B = e, t = gn()), e = t, e === n && (e = z, t = Mi(), t !== n && (B = e, t = _n()), e = t, e === n && (e = z, t = Ni(), t !== n && (B = e, t = vn()), e = t, e === n && (e = z, t = Li(), t !== n && (B = e, t = yn()), e = t, e === n && (e = z, t = Ri(), t !== n && (B = e, t = bn()), e = t, e === n && (e = z, t = zi(), t !== n && (B = e, t = xn()), e = t, e === n && (e = z, t = Bi(), t !== n && (B = e, t = Sn()), e = t, e === n && (e = z, t = Vi(), t !== n && (B = e, t = Cn()), e = t, e === n && (e = z, t = Hi(), t !== n && (B = e, t = wn()), e = t, e === n && (e = z, t = Ui(), t !== n && (B = e, t = Tn()), e = t)))))))))))), e;
	}
	function ti() {
		let e, t, r, i;
		return e = z, t = $i(), t === n ? (z = e, e = n) : ($(), r = Yr(), r === n ? (z = e, e = n) : ($(), i = ea(), i === n ? (z = e, e = n) : (B = e, e = En(r)))), e === n && (e = ni(), e === n && (e = li(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = Dn()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = On()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = kn()), e = t))))), e;
	}
	function ni() {
		let e, t, r, i, a;
		return e = z, t = ri(), t === n ? (z = e, e = n) : (r = $i(), r === n ? (z = e, e = n) : ($(), i = ii(), i === n && (i = null), $(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = An(t, i)))), e;
	}
	function ri() {
		let t, r;
		return t = z, e.substr(z, 6) === o ? (r = o, z += 6) : (r = n, W === 0 && J(xe)), r !== n && (B = t, r = jn()), t = r, t === n && (t = z, e.substr(z, 5) === s ? (r = s, z += 5) : (r = n, W === 0 && J(Se)), r !== n && (B = t, r = Mn()), t = r, t === n && (t = z, e.substr(z, 5) === c ? (r = c, z += 5) : (r = n, W === 0 && J(Ce)), r !== n && (B = t, r = Nn()), t = r, t === n && (t = z, e.substr(z, 6) === l ? (r = l, z += 6) : (r = n, W === 0 && J(we)), r !== n && (B = t, r = Pn()), t = r, t === n && (t = z, e.substr(z, 5) === u ? (r = u, z += 5) : (r = n, W === 0 && J(Te)), r !== n && (B = t, r = Fn()), t = r)))), t;
	}
	function ii() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = ai(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = ai(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = ai(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = In(t, r);
		} else z = e, e = n;
		return e;
	}
	function ai() {
		let e;
		return e = oi(), e === n && (e = pi()), e;
	}
	function oi() {
		let t, r, i, a, o, s, c, l, u = z * 91 + 21, d = Or.get(u);
		if (d) return z = d.nextPos, d.result;
		if (t = z, r = si(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), _.test(s) ? z++ : (s = n, W === 0 && J(Ee)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), _.test(s) ? z++ : (s = n, W === 0 && J(Ee)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			B = t, t = Ln(r, i);
		} else z = t, t = n;
		return Or.set(u, {
			nextPos: z,
			result: t
		}), t;
	}
	function si() {
		let t, r, i, a, o, s, c, l;
		if (t = z, r = ci(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, W === 0 && J(De)), s === n ? (z = a, a = n) : (c = $(), l = ci(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, W === 0 && J(De)), s === n ? (z = a, a = n) : (c = $(), l = ci(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			B = t, t = Rn(r, i);
		} else z = t, t = n;
		return t;
	}
	function ci() {
		let e, t, r, i;
		return e = z, t = $i(), t === n ? (z = e, e = n) : ($(), r = oi(), r === n ? (z = e, e = n) : ($(), i = ea(), i === n ? (z = e, e = n) : (B = e, e = zn(r)))), e === n && (e = ni(), e === n && (e = Y(), e === n && (e = li()))), e;
	}
	function li() {
		let e, t, r;
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = Br(), r === n ? (z = e, e = n) : (B = e, e = Bn(r))), e === n && (e = z, t = Ci(), t === n ? (z = e, e = n) : (r = Br(), r === n ? (z = e, e = n) : (B = e, e = j(r)))), e;
	}
	function ui() {
		let e, t, r, i, a, o, s, c, l;
		return e = z, t = z, r = la(), r === n ? (z = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (z = e, e = n) : (i = $(), a = z, o = la(), o === n ? (z = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = z, s = Qi(), s === n ? (z = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), B = e, e = Vn(t, a, o)), e;
	}
	function di() {
		let e, t;
		return e = Jr(), e === n && (e = ui(), e === n && (e = z, t = Ei(), t !== n && (B = e, t = Hn()), e = t, e === n && (e = z, t = la(), t !== n && (B = e, t = M(t)), e = t, e === n && (e = z, t = da(), t !== n && (B = e, t = Un(t)), e = t, e === n && (e = z, t = yi(), t !== n && (B = e, t = Wn(t)), e = t))))), e;
	}
	function fi() {
		let e, t, r;
		return e = z, t = na(), t === n ? (z = e, e = n) : (r = ra(), B = e, e = Gn(t, r)), e;
	}
	function Y() {
		let e, t;
		return e = z, t = pi(), t !== n && (B = e, t = Kn(t)), e = t, e === n && (e = z, t = sa(), t !== n && (B = e, t = N(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = qn()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = P()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = Jn()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return W++, e = z, t = da(), t !== n && (B = e, t = F(t)), e = t, W--, e === n && (t = n, W === 0 && J(Oe)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = z, t = Ji(), t === n ? (z = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (z = e, e = n) : (B = e, e = Yn(r))), e;
	}
	function hi() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = gi(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = gi(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = gi(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = I(t, r);
		} else z = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = z, t = da(), t === n ? (z = e, e = n) : ($(), r = Qi(), r === n ? (z = e, e = n) : ($(), i = Y(), i === n ? (z = e, e = n) : (B = e, e = Xn(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = L(r))), e;
	}
	function vi() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = Y(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = Y(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = Y(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = Zn(t, r);
		} else z = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = z, r = z, i = z, a = e.charAt(z), y.test(a) ? z++ : (a = n, W === 0 && J(ke)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else z = i, i = n;
		if (r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = Qn(r)), t = r, t === n) {
			if (t = z, r = z, i = [], a = e.charAt(z), b.test(a) ? z++ : (a = n, W === 0 && J(Ae)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(z), b.test(a) ? z++ : (a = n, W === 0 && J(Ae));
			else i = n;
			r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = $n(r)), t = r, t === n && (t = z, r = Gi(), r !== n && (B = t, r = er()), t = r, t === n && (t = z, r = Ki(), r !== n && (B = t, r = tr()), t = r, t === n && (t = z, r = qi(), r !== n && (B = t, r = nr()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(z), ie.test(t) ? z++ : (t = n, W === 0 && J(je)), t === n && (t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, W === 0 && J(Me)), r === n ? (z = t, t = n) : (i = z, W++, a = e.charAt(z), ae.test(a) ? z++ : (a = n, W === 0 && J(Ne)), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = z, t = ia(), t !== n && (B = e, t = rr(t)), e = t, e === n && (e = z, t = Gi(), t !== n && (B = e, t = ir()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = ar()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = or()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(z) === 36 ? (t = "$", z++) : (t = n, W === 0 && J(Pe)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(z) === 64 ? (t = "@", z++) : (t = n, W === 0 && J(Fe)), t;
	}
	function wi() {
		let t;
		return e.substr(z, 2) === ".." ? (t = "..", z += 2) : (t = n, W === 0 && J(Ie)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(z) === 46 ? (t = ".", z++) : (t = n, W === 0 && J(Le)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(z) === 42 ? (t = "*", z++) : (t = n, W === 0 && J(Re)), t;
	}
	function Di() {
		let t;
		return e.substr(z, 2) === "&&" ? (t = "&&", z += 2) : (t = n, W === 0 && J(ze)), t;
	}
	function Oi() {
		let t;
		return e.substr(z, 2) === "||" ? (t = "||", z += 2) : (t = n, W === 0 && J(Be)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(z) === 33 ? (t = "!", z++) : (t = n, W === 0 && J(Ve)), t;
	}
	function Ai() {
		let t;
		return e.substr(z, 2) === "==" ? (t = "==", z += 2) : (t = n, W === 0 && J(He)), t;
	}
	function ji() {
		let t;
		return e.substr(z, 2) === "!=" ? (t = "!=", z += 2) : (t = n, W === 0 && J(D)), t;
	}
	function Mi() {
		let t;
		return e.substr(z, 2) === ">=" ? (t = ">=", z += 2) : (t = n, W === 0 && J(Ue)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(z) === 62 ? (t = ">", z++) : (t = n, W === 0 && J(We)), t;
	}
	function Pi() {
		let t;
		return e.substr(z, 2) === "<=" ? (t = "<=", z += 2) : (t = n, W === 0 && J(Ge)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(z) === 60 ? (t = "<", z++) : (t = n, W === 0 && J(Ke)), t;
	}
	function Ii() {
		let t;
		return e.substr(z, 2) === "=~" ? (t = "=~", z += 2) : (t = n, W === 0 && J(qe)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = z, e.substr(z, 2) === "in" ? (r = "in", z += 2) : (r = n, W === 0 && J(Je)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = z, e.substr(z, 3) === "nin" ? (r = "nin", z += 3) : (r = n, W === 0 && J(Ye)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = z, e.substr(z, 8) === d ? (r = d, z += 8) : (r = n, W === 0 && J(Xe)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === f ? (r = f, z += 5) : (r = n, W === 0 && J(Ze)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === p ? (r = p, z += 6) : (r = n, W === 0 && J(Qe)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === m ? (r = m, z += 6) : (r = n, W === 0 && J($e)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === ee ? (r = ee, z += 4) : (r = n, W === 0 && J(et)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === h ? (r = h, z += 5) : (r = n, W === 0 && J(tt)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === te ? (r = te, z += 4) : (r = n, W === 0 && J(nt)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === ne ? (r = ne, z += 5) : (r = n, W === 0 && J(rt)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === g ? (r = g, z += 4) : (r = n, W === 0 && J(it)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(z) === 123 ? (t = "{", z++) : (t = n, W === 0 && J(at)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(z) === 125 ? (t = "}", z++) : (t = n, W === 0 && J(ot)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(z) === 91 ? (t = "[", z++) : (t = n, W === 0 && J(st)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(z) === 93 ? (t = "]", z++) : (t = n, W === 0 && J(ct)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(z) === 58 ? (t = ":", z++) : (t = n, W === 0 && J(lt)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(z) === 44 ? (t = ",", z++) : (t = n, W === 0 && J(ut)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(z) === 40 ? (t = "(", z++) : (t = n, W === 0 && J(dt)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(z) === 41 ? (t = ")", z++) : (t = n, W === 0 && J(ft)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(z) === 63 ? (t = "?", z++) : (t = n, W === 0 && J(pt)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (W++, t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, W === 0 && J(ht)), r !== n) {
			for (i = [], a = e.charAt(z), x.test(a) ? z++ : (a = n, W === 0 && J(gt)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, W === 0 && J(_t)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, W === 0 && J(vt)), s === n ? (z = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(z), x.test(a) ? z++ : (a = n, W === 0 && J(gt)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, W === 0 && J(_t)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, W === 0 && J(vt)), s === n ? (z = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(z) === 47 ? (a = "/", z++) : (a = n, W === 0 && J(ht)), a === n ? (z = t, t = n) : (B = t, t = sr(i));
		} else z = t, t = n;
		return W--, t === n && (r = n, W === 0 && J(mt)), t;
	}
	function ra() {
		let t, r, i;
		for (t = z, r = [], i = e.charAt(z), oe.test(i) ? z++ : (i = n, W === 0 && J(O)); i !== n;) r.push(i), i = e.charAt(z), oe.test(i) ? z++ : (i = n, W === 0 && J(O));
		return B = t, r = cr(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = z, r = z, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else z = r, r = n;
		return t = r === n ? r : e.substring(t, z), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(z), se.test(t) ? z++ : (t = n, W === 0 && J(yt)), t === n && (t = z, r = e.charAt(z), ce.test(r) ? z++ : (r = n, W === 0 && J(bt)), r === n ? (z = t, t = n) : (i = e.charAt(z), le.test(i) ? z++ : (i = n, W === 0 && J(xt)), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(z), S.test(t) ? z++ : (t = n, W === 0 && J(k))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (W++, t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, W === 0 && J(Me)), r === n && (r = null), i = ca(), i !== n) {
			if (a = z, e.charCodeAt(z) === 46 ? (o = ".", z++) : (o = n, W === 0 && J(Le)), o !== n) {
				if (s = [], c = e.charAt(z), S.test(c) ? z++ : (c = n, W === 0 && J(k)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(z), S.test(c) ? z++ : (c = n, W === 0 && J(k));
				else s = n;
				s === n ? (z = a, a = n) : (o = [o, s], a = o);
			} else z = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), B = t, t = lr(a, o);
		} else z = t, t = n;
		return W--, t === n && (r = n, W === 0 && J(St)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(z) === 48 ? (t = "0", z++) : (t = n, W === 0 && J(Ct)), t === n) {
			if (t = z, r = e.charAt(z), ue.test(r) ? z++ : (r = n, W === 0 && J(wt)), r !== n) {
				for (i = [], a = e.charAt(z), S.test(a) ? z++ : (a = n, W === 0 && J(k)); a !== n;) i.push(a), a = e.charAt(z), S.test(a) ? z++ : (a = n, W === 0 && J(k));
				r = [r, i], t = r;
			} else z = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (W++, t = z, e.charCodeAt(z) === 48 ? (r = "0", z++) : (r = n, W === 0 && J(Ct)), r === n) {
			if (r = z, e.charCodeAt(z) === 45 ? (i = "-", z++) : (i = n, W === 0 && J(Me)), i === n && (i = null), a = e.charAt(z), ue.test(a) ? z++ : (a = n, W === 0 && J(wt)), a !== n) {
				for (o = [], s = e.charAt(z), S.test(s) ? z++ : (s = n, W === 0 && J(k)); s !== n;) o.push(s), s = e.charAt(z), S.test(s) ? z++ : (s = n, W === 0 && J(k));
				i = [
					i,
					a,
					o
				], r = i;
			} else z = r, r = n;
		}
		return r !== n && (B = t, r = ur()), t = r, W--, t === n && (r = n, W === 0 && J(Tt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = z, r = e.charAt(z), C.test(r) ? z++ : (r = n, W === 0 && J(Et)), r !== n) {
			if (i = e.charAt(z), _.test(i) ? z++ : (i = n, W === 0 && J(Ee)), i === n && (i = null), a = [], o = e.charAt(z), S.test(o) ? z++ : (o = n, W === 0 && J(k)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(z), S.test(o) ? z++ : (o = n, W === 0 && J(k));
			else a = n;
			a === n ? (z = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else z = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (W++, t = z, e.charCodeAt(z) === 34 ? (r = "\"", z++) : (r = n, W === 0 && J(Dt)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(z) === 34 ? (a = "\"", z++) : (a = n, W === 0 && J(Dt)), a === n ? (z = t, t = n) : (B = t, t = dr(i));
		} else z = t, t = n;
		if (t === n) {
			if (t = z, e.charCodeAt(z) === 39 ? (r = "'", z++) : (r = n, W === 0 && J(Ot)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(z) === 39 ? (a = "'", z++) : (a = n, W === 0 && J(Ot)), a === n ? (z = t, t = n) : (B = t, t = fr(i));
			} else z = t, t = n;
		}
		return W--, t === n && (r = n, W === 0 && J(Oe)), t;
	}
	function fa() {
		let t, r, i;
		return t = z, r = z, W++, i = e.charAt(z), de.test(i) ? z++ : (i = n, W === 0 && J(kt)), W--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = pr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(_t)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 34 ? (i = "\"", z++) : (i = n, W === 0 && J(Dt)), i === n ? (z = t, t = n) : (B = t, t = mr())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(_t)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = hr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = z, r = z, W++, i = e.charAt(z), w.test(i) ? z++ : (i = n, W === 0 && J(At)), W--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = gr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(_t)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 39 ? (i = "'", z++) : (i = n, W === 0 && J(Ot)), i === n ? (z = t, t = n) : (B = t, t = _r())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(_t)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = vr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(z), fe.test(t) ? z++ : (t = n, W === 0 && J(jt)), t === n && (t = z, r = z, i = e.charAt(z), ce.test(i) ? z++ : (i = n, W === 0 && J(bt)), i === n ? (z = r, r = n) : (a = e.charAt(z), le.test(a) ? z++ : (a = n, W === 0 && J(xt)), a === n ? (z = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, z)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(_t)), r !== n && (B = t, r = yr()), t = r, t === n && (t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, W === 0 && J(ht)), r !== n && (B = t, r = br()), t = r, t === n && (t = z, e.charCodeAt(z) === 98 ? (r = "b", z++) : (r = n, W === 0 && J(Mt)), r !== n && (B = t, r = xr()), t = r, t === n && (t = z, e.charCodeAt(z) === 102 ? (r = "f", z++) : (r = n, W === 0 && J(Nt)), r !== n && (B = t, r = Sr()), t = r, t === n && (t = z, e.charCodeAt(z) === 110 ? (r = "n", z++) : (r = n, W === 0 && J(Pt)), r !== n && (B = t, r = Cr()), t = r, t === n && (t = z, e.charCodeAt(z) === 114 ? (r = "r", z++) : (r = n, W === 0 && J(Ft)), r !== n && (B = t, r = wr()), t = r, t === n && (t = z, e.charCodeAt(z) === 116 ? (r = "t", z++) : (r = n, W === 0 && J(It)), r !== n && (B = t, r = Tr()), t = r, t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, W === 0 && J(Lt)), r === n ? (z = t, t = n) : (i = z, a = z, o = e.charAt(z), T.test(o) ? z++ : (o = n, W === 0 && J(Rt)), o === n ? (z = a, a = n) : (s = e.charAt(z), pe.test(s) ? z++ : (s = n, W === 0 && J(zt)), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (e.substr(z, 2) === "\\u" ? (a = "\\u", z += 2) : (a = n, W === 0 && J(Bt)), a === n ? (z = t, t = n) : (o = z, s = z, c = e.charAt(z), T.test(c) ? z++ : (c = n, W === 0 && J(Rt)), c === n ? (z = s, s = n) : (l = e.charAt(z), E.test(l) ? z++ : (l = n, W === 0 && J(Vt)), l === n ? (z = s, s = n) : (u = Z(), u === n ? (z = s, s = n) : (d = Z(), d === n ? (z = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, z), o === n ? (z = t, t = n) : (B = t, t = R(i, o))))), t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, W === 0 && J(Lt)), r === n ? (z = t, t = n) : (i = z, a = z, o = Z(), o === n ? (z = a, a = n) : (s = Z(), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (B = z, a = Er(i), a = a ? n : void 0, a === n ? (z = t, t = n) : (B = t, t = Dr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(z), ve.test(t) ? z++ : (t = n, W === 0 && J(Ht)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(z), ie.test(t) ? z++ : (t = n, W === 0 && J(je)), t;
	}
	function $() {
		let t, r;
		for (W++, t = [], r = e.charAt(z), ye.test(r) ? z++ : (r = n, W === 0 && J(Ut)); r !== n;) t.push(r), r = e.charAt(z), ye.test(r) ? z++ : (r = n, W === 0 && J(Ut));
		return W--, t;
	}
	function ga() {
		let t, r;
		return t = z, W++, e.length > z ? (r = e.charAt(z), z++) : (r = n, W === 0 && J(vt)), W--, r === n ? t = void 0 : (z = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && Ar("Member name too long (maximum 1000 characters)"), e;
	}
	G = a();
	let va = G !== n && z === e.length;
	function ya() {
		throw G !== n && z < e.length && J(Nr()), Rr(U, H < e.length ? jr(H) : null, H < e.length ? Ir(H, H + 1) : Ir(H, H));
	}
	if (t.peg$library) return {
		peg$result: G,
		peg$currPos: z,
		peg$FAILED: n,
		peg$maxFailExpected: U,
		peg$maxFailPos: H,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return G;
	ya();
}
var ye = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), be = {
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
}, xe = (e) => {
	throw new v(1, 1, e);
}, Se = (e) => e.type === "root" || e.type === "current", Ce = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function we(e) {
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
		if (Se(i)) r === "value" && !Ce(i) && xe("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && xe(`Expected a query, found ${String(i.type)}`), i.type) {
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
				let e = ye.has(i.operator) ? "value" : "any";
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
				let e = i.name, n = be[e], a = i.args;
				a.length !== n.args.length && xe(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && xe(`The result of ${e}() must be compared`), r === "value" && n.logical && xe(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
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
			case "value": r === "test" && xe("A literal must be compared");
		}
	}
}
function Te(e) {
	let t;
	try {
		t = ve(e);
	} catch (e) {
		if (ue(e)) throw new v(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new v(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new v(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return we(t), t;
}
var Ee = /* @__PURE__ */ new Set([
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
]), De = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), Oe = (e) => e >= 55296 && e <= 56319, ke = (e) => e >= 56320 && e <= 57343, Ae = (e) => e !== void 0 && e >= "0" && e <= "9", je = (e, t) => {
	let n = e.charCodeAt(t);
	return Oe(n) && ke(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : Oe(n) || ke(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, Me = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !Ee.has(n) ? null : n === "n" ? {
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
}, Ne = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return De.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, Pe = (e, t) => {
	let n = e[t];
	return n === "\\" ? Me(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : je(e, t);
}, Fe = (e, t) => {
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
			let t = Ne(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = Pe(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = Pe(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, Ie = (e, t) => {
	let n = t + 1, r = n;
	for (; Ae(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; Ae(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, Le = (e) => {
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
				let e = i ? Ie(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = Fe(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = Ne(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = Me(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = je(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, Re = 1e3, ze = 1e3, Be = 16, Ve = /^[dgimsuy]*$/, He = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, D = class extends Error {}, Ue = 0, We = 1, Ge = 2, Ke = 3, qe = 4, Je = 5, Ye = g(2, 31) - 1, Xe = (e, t) => {
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
	return e.scratch = void 0, (r.gen > Ye - t - 2 || r.step > Ye - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Ze = /* @__PURE__ */ new Set([
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
]), Qe = /^\{(\d+)(?:,(\d*))?\}/, $e = /^[0-9a-fA-F]{4}/, et = /^\(\?([ims]*)(?:-([ims]*))?:/, tt = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, nt = class {
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
		if (this.i < this.src.length) throw new D("unexpected character");
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
				let r = et.exec(e.slice(t, t + 12));
				if (!r) throw new D("lookaround or named group");
				let i = _({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new D("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new D("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new D("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Ze.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new D("trailing backslash");
		if (r === "b" || r === "B") throw new D("word boundary");
		if (r >= "1" && r <= "9") throw new D("backreference");
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
			if (n === -1) throw new D("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && $e.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if ($e.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
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
			let n = Qe.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > Re || i !== Infinity && i > Re) throw new D("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, rt = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= Re) throw new D("pattern too large");
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
		this.emit(Je);
	}
	compile(e) {
		if (++this.work > 4 * Re) throw new D("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Ue, this.atomId(e));
				return;
			case "bol":
				this.emit(Ke, +!!e.multiline);
				return;
			case "eol":
				this.emit(qe, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(We);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Ge)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(We);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Ge, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(We);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, it = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new nt(e, r, t, n).parse(), a = new rt(r);
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
}, at = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: te, atomHit: ne } = r, g = r.gen, re = r.step;
	r.gen = g + t.length + 2, r.step = re + t.length + 2;
	let _ = 0, v = !1, y = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== g) switch (ee[r] = g, ++c === 64 && (u(c), c = 0), i[r]) {
				case Ue:
					e[n++] = r;
					break;
				case Je: return u(c), v = !0, n;
				case Ge:
					h[s++] = a[r];
					break;
				case We:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case Ke:
					(_ === 0 || a[r] === 1 && tt(t.charCodeAt(_ - 1))) && (h[s++] = r + 1);
					break;
				case qe: (_ === t.length || a[r] === 1 && tt(t.charCodeAt(_))) && (h[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (g++, p = y(d, 0, 0), v) return !0;
	for (; _ < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(_) : t.charCodeAt(_)) > 65535 ? 2 : 1, n = t.slice(_, _ + e), r = re + _ + 1;
		g++, m = 0, _ += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (te[i] !== r) {
				te[i] = r;
				let e = s[i];
				ne[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (ne[i] === 1 && (m = y(f, m, t + 1), v)) return !0;
		}
		if (!l && (m = y(f, m, 0), v)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, ot = (e, t, n) => {
	let r = Xe(e, t.length);
	try {
		return at(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, st = 256, ct = /* @__PURE__ */ new Map(), lt = 0, ut = (e, t, n, r, i = !1) => {
	if (e.length > ze || t.length > 7 || !Ve.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = ct.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = He(s) > Be ? null : it(n ? `^(?:${s})$` : s, t, i);
	lt >= st && (ct.clear(), lt = 0);
	let l = ct.get(s);
	return l === void 0 && ct.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), lt++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, dt = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), ot(e, t, n);
}, ft = class {
	constructor(e) {
		this.nodes = e;
	}
}, pt = (e) => {
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
}, mt = (e) => {
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
	return !pt(e);
}, ht = 256, gt = /* @__PURE__ */ new Map(), _t = (e, t) => {
	let n = gt.get(e);
	return n === void 0 && (n = mt(e), gt.size >= ht && gt.clear(), gt.set(Array.from(e).join(""), n)), t(e.length), n;
}, vt = /* @__PURE__ */ new Map(), O = (e, t) => {
	let n = vt.get(e);
	return n === void 0 && (n = Le(e), n !== null && (n = Array.from(n).join("")), vt.size >= ht && vt.clear(), vt.set(Array.from(e).join(""), n)), t(e.length), n;
}, yt = 256, bt = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > ze) c = null;
		else if (o) {
			let n = O(e, i);
			c = n === null ? null : ut(n, t, r, i, !0);
		} else c = _t(e, i) ? ut(e, t, r, i) : null;
		s !== void 0 && (s.size >= yt && s.clear(), s.set(a, c));
	}
	return c !== null && dt(c, n, i);
}, xt = {
	length: (e, t) => {
		let n = e[0];
		if (T(n)) {
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
		if (C(n)) return S(n);
		if (w(n)) {
			let e = le(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !T(r) || !T(i) ? !1 : bt(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !T(r) || !T(i) ? !1 : bt(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, k = (e, t, n = b) => e === void 0 && t === void 0 || ae(e, t, n), St = (e, t, n = b) => !ae(e, t, n), Ct = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, wt = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return Ct(n) - Ct(i);
	}
	return e.length - t.length;
}, Tt = (e, t, n = b) => fe(e) && fe(t) ? e < t : T(e) && T(t) ? (n(Math.min(e.length, t.length)), wt(e, t) < 0) : !1, Et = (e, t, n = b) => Tt(e, t, n) || k(e, t, n), Dt = (e, t, n = b) => fe(e) && fe(t) ? e > t : T(e) && T(t) ? (n(Math.min(e.length, t.length)), wt(e, t) > 0) : !1, Ot = (e, t, n = b) => Dt(e, t, n) || k(e, t, n), kt = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, At = (e, t, n) => {
	let r = S(e);
	for (let i = 0; i < r; i++) {
		let r = oe(e, i);
		if (n(1 + kt(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, jt = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, Mt = (e) => typeof e == "string" && e.length + 1 > se, Nt = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = S(e);
	for (let n = 0; n < a; n++) {
		let r = oe(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), Mt(r) ? i.long.push(r) : i.set.add(jt(r));
	}
	return n?.set(e, i), i;
}, Pt = ({ set: e, long: t }, n, r) => {
	if (Mt(n)) {
		for (let e of t) if (r(1 + kt(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(jt(n)));
}, Ft = (e, t, n) => {
	let r = S(e);
	for (let i = 0; i < r; i++) if (n(), x(e, i) && t(e[i])) return !0;
	return !1;
}, It = {
	eq: k,
	ne: St,
	lt: Tt,
	le: Et,
	gt: Dt,
	ge: Ot,
	in: (e, t, n = b) => C(t) ? At(t, e, n) !== -1 : !1,
	nin: (e, t, n = b) => C(t) ? At(t, e, n) === -1 : !1,
	subsetof: (e, t, n = b, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = Nt(t, n, r);
		return !Ft(e, (e) => !Pt(i, e, n), n);
	},
	anyof: (e, t, n = b, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = Nt(t, n, r);
		return Ft(e, (e) => Pt(i, e, n), n);
	},
	noneof: (e, t, n = b, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = Nt(t, n, r);
		return !Ft(e, (e) => Pt(i, e, n), n);
	},
	sizeof: (e, t) => !C(e) && !T(e) || !C(t) && !T(t) ? !1 : (C(e) ? S(e) : e.length) === (C(t) ? S(t) : t.length),
	size: (e, t) => !C(e) && !T(e) || !fe(t) ? !1 : (C(e) ? S(e) : e.length) === t
}, Lt = (e) => !C(e) && !T(e) ? !1 : (C(e) ? S(e) : e.length) === 0, Rt = (e, t, n, r = b, i) => !T(e) || !T(t) ? !1 : bt(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), zt = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), Bt = (e, t) => e.concat(`[${t}]`), Vt = (e, t) => e < 0 ? t + e : e, Ht = (e, t) => {
	let n = S(e), r = Vt(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: x(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, Ut = (e, t) => {
	for (let n of t) e.push(n);
}, Wt = 1e6, Gt = 100, Kt = 1e6, qt = 20, Jt = 1e4, Yt = 1e4, Xt = class {
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
					x(n, r) && this.visit(n[r]);
				} else if (x(n, t)) this.visit(n[t]);
				else if (++e.holes > Yt) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!x(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), C(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: S(e),
				i: 0,
				holes: 0
			});
			else if (w(e)) {
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
}, Zt = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, zt(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = zt(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = S(e);
			for (let r = 0; r < n; r++) this.tick(), x(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Xt(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Jt, Math.ceil((this.retained - this.retainedLimit) / qt))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new y(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(Wt, Gt * e.weight) + t, this.retainedLimit = Math.max(Kt, qt * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Xt(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Jt, Math.ceil((this.steps - this.stepLimit) / Gt))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new y(`Query exceeded ${this.stepLimit} evaluation steps`);
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
			if (!w(e)) return;
			let r = this.canonicalName(n, n.value);
			if (x(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (C(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: Bt(t, r)
					});
				}), n;
			}
			if (w(e)) {
				let n = le(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) x(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!C(e)) return;
			let r = Ht(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: Bt(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (C(e)) {
				let r = Ht(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: Bt(t, r.index)
				} : void 0;
			}
			if (w(e)) {
				let r = String(n.value);
				return x(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!C(e)) return [];
			let r = S(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : Vt(n.start, r), o = n.end === null ? r : Vt(n.end, r)) : (a = n.start === null ? r - 1 : Vt(n.start, r), o = n.end === null ? -r - 1 : Vt(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: x(e, u) ? e[u] : void 0,
				paths: Bt(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (w(e.value)) {
						let t = this.handleIdentifier(e, r);
						E(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (w(e.value)) {
						let t = this.handleStringLiteral(e, r);
						E(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (C(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						E(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					Ut(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": Ut(n, this.handleBracketExpressionContent(e, r));
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
						E(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						Ut(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						Ut(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						E(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (w(e)) {
					let t = le(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else C(e) && i.push({
					parent: a,
					keys: null,
					length: S(e),
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
						if (!x(n, t)) continue;
						a = {
							value: n[t],
							paths: Bt(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!x(n, r)) continue;
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
						if (!fe(i) || !fe(r)) i = void 0;
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
					return fe(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return Lt(n);
			if (t.operator === "reg") return Rt(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = It[t.operator];
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
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new ft(r.value) : new ft(E(r?.value) ? [r?.value] : []);
			}), i = xt[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
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
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : E(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : E(n);
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
					if (C(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: Bt(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (w(n)) {
						let i = le(n);
						this.tick(i.length);
						for (let a of i) {
							if (!x(n, a)) continue;
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
					if (!E(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) Ut(n, a);
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
				throw ue(e) ? new y("Query is nested too deeply") : de(e) ? new y("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? Wt, this.retainedLimit = this.adaptiveLimit ? Kt : Infinity;
	}
}, Qt = (e, t, n) => {
	let r = Te(t), i = new Zt(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? pe(i) ? [] : [i.value] : i?.value;
}, $t = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Qt(e, i, n);
		E(t) && r.push(t);
	}
	return r;
}, en = (e, t, n = {}) => {
	try {
		return C(t) ? $t(e, t, n) : Qt(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, tn = (e) => typeof e == "object" && !!e && !Array.isArray(e), nn = (e, t) => {
	if (!tn(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = A(t, i);
	return n;
}, rn = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => A(t, e));
}, an = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, on = (e, t) => an(e, t), sn = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, cn = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, ln = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: cn,
		applyTemplate: e
	});
}, A = (e, t, n) => {
	let r = e, i = t;
	sn(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? an(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = on(a?.textContent, r)), "attributes" in a && (a.attributes = nn(a?.attributes, r)), "children" in a && (a.children = rn(a?.children, r))), a);
};
ln(A);
// ../json-renderers-run-instructions-steps/node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var un = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, dn = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, fn = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: dn,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, pn = (e, t) => {
	let n = e, r = t;
	return un(n, r), n.map((e) => A(e, r));
};
fn((e, t) => {
	let n = e;
	return un(n, t), n.map((e) => A(e, e[t]));
}, pn);
// ../json-renderers-run-instructions-steps/node_modules/json-transformer-funcs/src/v24/findByRole.js
var mn = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = mn(n, t);
		if (e) return e;
	}
	return null;
}, hn = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = en(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = mn(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
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
}, gn = (e, t, n, r) => {
	let { parent: i, key: a } = hn(e, t, r);
	return (m[t.action] || p)(i, a, n), e;
}, _n = (e, t) => {
	if (!e) return null;
	let n = t[e.fileName];
	if (n === void 0) throw Error(`Entry not found in state: ${e.fileName}`);
	if (e.jsonPath) {
		let t = en(n, e.jsonPath, { returnArray: !0 });
		return t.length === 0 ? Array.isArray(n) ? n : [] : t.length === 1 ? t[0] : t;
	}
	return Array.isArray(e.filePath) && e.filePath.length > 0 ? e.filePath.reduce((e, t) => e ? e[t] : void 0, n) : n;
}, vn = (e, t, n, r = !1) => {
	if (t) {
		if (!t.filePath || t.filePath.length === 0) {
			let r = e[t.fileName];
			Array.isArray(r) ? r.push(...Array.isArray(n) ? n : [n]) : e[t.fileName] = n;
		} else try {
			gn(e, t, n, r);
		} catch {}
	}
}, yn = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), bn = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, xn = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (bn(e, t), t.map((t) => {
	let i = A(t, r);
	return i.children = pn(yn(e, t), n), i;
})), Sn = {
	applyTemplate: A,
	fromCollection: pn
}, Cn = (e, t, n) => {
	if (n == null) return structuredClone(t);
	let r = Sn[n];
	if (!r) throw Error(`Unknown function: ${n}`);
	return r(e, t);
}, wn = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => xn({
	columns: e,
	data: t,
	columnSpec: n,
	rowSpec: r
}), Tn = ({ columns: e = [], rows: t = [], columnSpec: n, rowSpec: r } = {}) => e.map((e) => {
	let i = A(e, n), a = [];
	return Array.isArray(e.options) && e.options.length > 0 ? a = e.options.map((e) => typeof e == "object" ? e : { rowValue: e }) : Array.isArray(t) && t.length > 0 && (a = t.map((t) => ({
		...t,
		rowValue: t[e.columnName] ?? t.value ?? t
	}))), i.children = a.map((e) => A(e, r)), i;
}), En = {
	single: (e, t) => {
		let n = s[e.templateKey];
		return Cn(_n(e.sourcePath, t), n, e.func);
	},
	rowOnColumn: (e, { data: t }) => {
		let { columnKey: n, rowKey: r } = e.templateKey;
		return wn({
			columns: t?.columns,
			data: t?.data ?? (Array.isArray(t) ? t : t?.rows),
			columnSpec: s[n],
			rowSpec: s[r]
		});
	},
	columnOnRow: (e, { data: t }) => {
		let { columnKey: n, rowKey: r } = e.templateKey;
		return Tn({
			columns: t?.columns,
			rows: t?.data ?? (Array.isArray(t) ? t : t?.rows),
			columnSpec: s[n],
			rowSpec: s[r]
		});
	}
}, Dn = (e, t, n = !1) => {
	let r = u[e], i = En[r.type](r, t);
	return vn(t, r.destinationPath, i, n), i;
}, On = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => (e.forEach((e) => {
	r && console.log(`[runStep] ${e}`), Dn(e, {
		base: t,
		data: n
	}, r);
}), t), kn = (e) => Array.isArray(e) ? e : [e], An = (e, t, n) => {
	e[t] = n;
}, jn = {
	set: An,
	push: (e, t, n) => {
		e[t].push(...kn(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...kn(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(kn(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(kn(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, Mn = Object.defineProperty, Nn = Object.getOwnPropertySymbols, Pn = Object.prototype.hasOwnProperty, Fn = Object.prototype.propertyIsEnumerable, In = Math.pow, Ln = (e, t, n) => t in e ? Mn(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Rn = (e, t) => {
	for (var n in t ||= {}) Pn.call(t, n) && Ln(e, n, t[n]);
	if (Nn) for (var n of Nn(t)) Fn.call(t, n) && Ln(e, n, t[n]);
	return e;
}, zn = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, Bn = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, j = () => void 0, Vn = (e, t, n, r) => {
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
		let i = Kn(e), a = Kn(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, Hn = (e, t, n = j) => {
	let r = [];
	if (!Vn(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!Vn(Un(e.x, t), Un(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !M(o, i) || !M(a, i)) return !1;
			let s = a[i];
			if (!M(o, i) || !Vn(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, M = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Un = (e, t) => M(e, t) ? e[t] : void 0, Wn = 16383, Gn = 1e3, Kn = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > Gn) throw new Bn(`Member name too long (maximum ${Gn} characters)`);
	return t;
}, N = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, qn = (e) => e instanceof RangeError && /call stack/i.test(e.message), P = (e) => Array.isArray(e), Jn = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), F = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, Yn = (e) => typeof e == "number", I = (e) => typeof e == "string", Xn = (e) => e === void 0, L = (e) => e !== void 0;
function Zn(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function Qn(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function $n(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var er = class extends SyntaxError {
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
function tr(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: zr }, a = zr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", te = "true", ne = "false", g = "null", re = /^[,\]]/, _ = /^[+\-]/, v = /^[*\/]/, y = /^[a-zA-Z_]/, b = /^[\x80-\uFFFF_]/, ie = /^[a-zA-Z0-9_]/, ae = /^[0-9@$\-]/, x = /^[^\/\\]/, oe = /^[gimsuy]/, se = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, ce = /^[\uD800-\uDBFF]/, le = /^[\uDC00-\uDFFF]/, S = /^[0-9]/, ue = /^[1-9]/, C = /^[eE]/, de = /^["\\]/, w = /^['\\]/, fe = /^[ -\uD7FF\uE000-\uFFFF]/, T = /^[dD]/, pe = /^[89abAB]/, E = /^[c-fC-F]/, me = /^[0-9a-fA-F]/, he = /^[ \t\n\r]/, ge = q([",", "]"], !1, !1, !1), _e = K("length", !1), ve = K("count", !1), ye = K("match", !1), be = K("search", !1), xe = K("value", !1), Se = q(["+", "-"], !1, !1, !1), Ce = q(["*", "/"], !1, !1, !1), we = Pr("string"), Te = q([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Ee = q([["", "￿"], "_"], !1, !1, !1), De = q([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Oe = K("-", !1), ke = q([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Ae = K("$", !1), je = K("@", !1), Me = K("..", !1), Ne = K(".", !1), Pe = K("*", !1), Fe = K("&&", !1), Ie = K("||", !1), Le = K("!", !1), Re = K("==", !1), ze = K("!=", !1), Be = K(">=", !1), Ve = K(">", !1), He = K("<=", !1), D = K("<", !1), Ue = K("=~", !1), We = K("in", !1), Ge = K("nin", !1), Ke = K("subsetof", !1), qe = K("anyof", !1), Je = K("noneof", !1), Ye = K("sizeof", !1), Xe = K("size", !1), Ze = K("empty", !1), Qe = K("true", !1), $e = K("false", !1), et = K("null", !1), tt = K("{", !1), nt = K("}", !1), rt = K("[", !1), it = K("]", !1), at = K(":", !1), ot = K(",", !1), st = K("(", !1), ct = K(")", !1), lt = K("?", !1), ut = Pr("regex"), dt = K("/", !1), ft = q(["/", "\\"], !0, !1, !1), pt = K("\\", !1), mt = Mr(), ht = q([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), gt = q([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), _t = q([["\ud800", "\udbff"]], !1, !1, !1), vt = q([["\udc00", "\udfff"]], !1, !1, !1), O = q([["0", "9"]], !1, !1, !1), yt = Pr("number"), bt = K("0", !1), xt = q([["1", "9"]], !1, !1, !1), k = Pr("integer"), St = q(["e", "E"], !1, !1, !1), Ct = K("\"", !1), wt = K("'", !1), Tt = q(["\"", "\\"], !1, !1, !1), Et = q(["'", "\\"], !1, !1, !1), Dt = q([[" ", "퟿"], ["", "￿"]], !1, !1, !1), Ot = K("b", !1), kt = K("f", !1), At = K("n", !1), jt = K("r", !1), Mt = K("t", !1), Nt = K("u", !1), Pt = q(["d", "D"], !1, !1, !1), Ft = q([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), It = K("\\u", !1), Lt = q([["c", "f"], ["C", "F"]], !1, !1, !1), Rt = q([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), zt = q([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Bt(e) {
		return {
			type: "root",
			next: Zn(e)
		};
	}
	function Vt(e) {
		return e.map((e) => e[1]);
	}
	function Ht(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function Ut(e) {
		return e;
	}
	function Wt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Gt() {
		return { type: "wildcard" };
	}
	function Kt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function qt() {
		return { type: "wildcard" };
	}
	function Jt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Yt(e) {
		return e;
	}
	function Xt(e) {
		return e;
	}
	function Zt(e, t) {
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
	function Qt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function $t(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function en(e, t) {
		return $n(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function tn(e, t) {
		return $n(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function nn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function rn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function an(e, t) {
		return t !== null || Qn(e);
	}
	function on(e, t) {
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
	function sn(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function cn(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function ln() {
		return { operator: "empty" };
	}
	function A() {
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
		return t.length === 0 ? e : $n(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function Pn(e, t) {
		return t.length === 0 ? e : $n(e, t, (e, t) => ({
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
			next: Zn(e)
		};
	}
	function Ln(e) {
		return {
			type: "current",
			next: Zn(e)
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
	function j(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function Vn(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Hn(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function M(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Un(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function Wn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Gn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Kn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function N(e) {
		return e;
	}
	function qn(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function P(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Jn(e, t) {
		return [e, t.value];
	}
	function F(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function Yn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function I(e) {
		return _a(e);
	}
	function Xn(e) {
		return _a(e);
	}
	function L() {
		return "true";
	}
	function tr() {
		return "false";
	}
	function nr() {
		return "null";
	}
	function rr(e) {
		return _a(e);
	}
	function ir() {
		return "true";
	}
	function ar() {
		return "false";
	}
	function or() {
		return "null";
	}
	function sr(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function cr(e) {
		return e.join("");
	}
	function lr(e, t) {
		let n = parseFloat(kr());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && Ar("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function ur() {
		let e = parseInt(kr(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && Ar("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function dr(e) {
		return e.join("");
	}
	function fr(e) {
		return e.join("");
	}
	function pr(e) {
		return e;
	}
	function mr() {
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
	function R(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function Er(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Dr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let z = t.peg$currPos | 0, B = z, V = [{
		line: 1,
		column: 1
	}], H = z, U = t.peg$maxFailExpected || [], W = t.peg$silentFails | 0, Or = /* @__PURE__ */ new Map(), G;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function kr() {
		return e.substring(B, z);
	}
	function Ar(e, t) {
		throw t = t === void 0 ? Ir(B, z) : t, Lr(e, t);
	}
	function jr(t = z) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function K(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function q(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Mr() {
		return { type: "any" };
	}
	function Nr() {
		return { type: "end" };
	}
	function Pr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Fr(t) {
		let n = V[t], r;
		if (n) return n;
		if (t >= V.length) r = V.length - 1;
		else for (r = t; !V[--r];);
		for (n = V[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return V[t] = n, n;
	}
	function Ir(e, t, n) {
		let i = Fr(e), a = Fr(t), o = {
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
	function J(e) {
		z < H || (z > H && (H = z, U = []), U.push(e));
	}
	function Lr(e, t) {
		return new er(e, null, null, t);
	}
	function Rr(e, t, n) {
		return new er(er.buildMessage(e, t), e, t, n);
	}
	function zr() {
		let e, t, r, i;
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = Br(), i = ga(), i === n ? (z = e, e = n) : (B = e, e = Bt(r))), e;
	}
	function Br() {
		let e, t, r, i, a;
		for (e = z, t = [], r = z, i = $(), a = Vr(), a === n ? (z = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = z, i = $(), a = Vr(), a === n ? (z = r, r = n) : (i = [i, a], r = i);
		return B = e, t = Vt(t), e = t, e;
	}
	function Vr() {
		let e;
		return e = Ur(), e === n && (e = Hr()), e;
	}
	function Hr() {
		let e, t, r;
		return e = z, t = Ti(), t === n ? (z = e, e = n) : (r = Wr(), r === n ? (z = e, e = n) : (B = e, e = Ht(r))), e === n && (e = z, t = Kr(), t !== n && (B = e, t = Ut(t)), e = t), e;
	}
	function Ur() {
		let e, t, r;
		return e = z, t = wi(), t === n ? (z = e, e = n) : (r = Gr(), r === n ? (z = e, e = n) : (B = e, e = Wt(r))), e;
	}
	function Wr() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = Gt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = Kt(t)), e = t), e;
	}
	function Gr() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = qt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = Jt(t)), e = t, e === n && (e = z, t = Kr(), t !== n && (B = e, t = Yt(t)), e = t)), e;
	}
	function Kr() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = qr(), r === n ? (z = e, e = n) : ($(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = Xt(r)))), e;
	}
	function qr() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = di(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = di(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = di(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = Zt(t, r);
		} else z = e, e = n;
		return e;
	}
	function Jr() {
		let t, r, i, a, o, s, c, l, u;
		return t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = $i(), i === n ? (z = t, t = n) : ($(), a = Yr(), a === n ? (z = t, t = n) : ($(), o = ea(), o === n ? (z = t, t = n) : (s = z, W++, c = z, l = $(), u = e.charAt(z), re.test(u) ? z++ : (u = n, W === 0 && J(ge)), u === n ? (z = c, c = n) : (l = [l, u], c = l), W--, c === n ? s = n : (z = s, s = void 0), s === n ? (z = t, t = n) : (B = t, t = Qt(a)))))), t === n && (t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = Yr(), i === n ? (z = t, t = n) : (B = t, t = $t(i)))), t;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c, l = z * 91 + 10, u = Or.get(l);
		if (u) return z = u.nextPos, u.result;
		if (e = z, t = Xr(), t !== n) {
			for (r = [], i = z, a = $(), o = Oi(), o === n ? (z = i, i = n) : (s = $(), c = Xr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = Oi(), o === n ? (z = i, i = n) : (s = $(), c = Xr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = en(t, r);
		} else z = e, e = n;
		return Or.set(l, {
			nextPos: z,
			result: e
		}), e;
	}
	function Xr() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = Zr(), t !== n) {
			for (r = [], i = z, a = $(), o = Di(), o === n ? (z = i, i = n) : (s = $(), c = Zr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = Di(), o === n ? (z = i, i = n) : (s = $(), c = Zr(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = tn(t, r);
		} else z = e, e = n;
		return e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = $i(), r === n ? (z = e, e = n) : ($(), i = Yr(), i === n ? (z = e, e = n) : ($(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = nn(i))))), e === n && (e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = ti(), r === n ? (z = e, e = n) : (B = e, e = rn(r))), e === n && (e = Qr())), e;
	}
	function Qr() {
		let e, t, r, i, a;
		return e = z, t = oi(), t === n ? (z = e, e = n) : (r = z, i = $(), a = $r(), a === n ? (z = r, r = n) : (i = [i, a], r = i), r === n && (r = null), B = z, i = an(t, r), i = i ? void 0 : n, i === n ? (z = e, e = n) : (B = e, e = on(t, r))), e === n && (e = ti()), e;
	}
	function $r() {
		let e, t, r;
		return e = z, t = ei(), t === n ? (z = e, e = n) : ($(), r = oi(), r === n ? (z = e, e = n) : (B = e, e = sn(t, r))), e === n && (e = z, t = Ii(), t === n ? (z = e, e = n) : ($(), r = fi(), r === n ? (z = e, e = n) : (B = e, e = cn(r))), e === n && (e = z, t = Wi(), t !== n && (B = e, t = ln()), e = t)), e;
	}
	function ei() {
		let e, t;
		return e = z, t = Ai(), t !== n && (B = e, t = A()), e = t, e === n && (e = z, t = ji(), t !== n && (B = e, t = un()), e = t, e === n && (e = z, t = Pi(), t !== n && (B = e, t = dn()), e = t, e === n && (e = z, t = Fi(), t !== n && (B = e, t = fn()), e = t, e === n && (e = z, t = Mi(), t !== n && (B = e, t = pn()), e = t, e === n && (e = z, t = Ni(), t !== n && (B = e, t = mn()), e = t, e === n && (e = z, t = Li(), t !== n && (B = e, t = hn()), e = t, e === n && (e = z, t = Ri(), t !== n && (B = e, t = gn()), e = t, e === n && (e = z, t = zi(), t !== n && (B = e, t = _n()), e = t, e === n && (e = z, t = Bi(), t !== n && (B = e, t = vn()), e = t, e === n && (e = z, t = Vi(), t !== n && (B = e, t = yn()), e = t, e === n && (e = z, t = Hi(), t !== n && (B = e, t = bn()), e = t, e === n && (e = z, t = Ui(), t !== n && (B = e, t = xn()), e = t)))))))))))), e;
	}
	function ti() {
		let e, t, r, i;
		return e = z, t = $i(), t === n ? (z = e, e = n) : ($(), r = Yr(), r === n ? (z = e, e = n) : ($(), i = ea(), i === n ? (z = e, e = n) : (B = e, e = Sn(r)))), e === n && (e = ni(), e === n && (e = li(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = Cn()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = wn()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = Tn()), e = t))))), e;
	}
	function ni() {
		let e, t, r, i, a;
		return e = z, t = ri(), t === n ? (z = e, e = n) : (r = $i(), r === n ? (z = e, e = n) : ($(), i = ii(), i === n && (i = null), $(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = En(t, i)))), e;
	}
	function ri() {
		let t, r;
		return t = z, e.substr(z, 6) === o ? (r = o, z += 6) : (r = n, W === 0 && J(_e)), r !== n && (B = t, r = Dn()), t = r, t === n && (t = z, e.substr(z, 5) === s ? (r = s, z += 5) : (r = n, W === 0 && J(ve)), r !== n && (B = t, r = On()), t = r, t === n && (t = z, e.substr(z, 5) === c ? (r = c, z += 5) : (r = n, W === 0 && J(ye)), r !== n && (B = t, r = kn()), t = r, t === n && (t = z, e.substr(z, 6) === l ? (r = l, z += 6) : (r = n, W === 0 && J(be)), r !== n && (B = t, r = An()), t = r, t === n && (t = z, e.substr(z, 5) === u ? (r = u, z += 5) : (r = n, W === 0 && J(xe)), r !== n && (B = t, r = jn()), t = r)))), t;
	}
	function ii() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = ai(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = ai(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = ai(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = Mn(t, r);
		} else z = e, e = n;
		return e;
	}
	function ai() {
		let e;
		return e = oi(), e === n && (e = pi()), e;
	}
	function oi() {
		let t, r, i, a, o, s, c, l, u = z * 91 + 21, d = Or.get(u);
		if (d) return z = d.nextPos, d.result;
		if (t = z, r = si(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), _.test(s) ? z++ : (s = n, W === 0 && J(Se)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), _.test(s) ? z++ : (s = n, W === 0 && J(Se)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			B = t, t = Nn(r, i);
		} else z = t, t = n;
		return Or.set(u, {
			nextPos: z,
			result: t
		}), t;
	}
	function si() {
		let t, r, i, a, o, s, c, l;
		if (t = z, r = ci(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, W === 0 && J(Ce)), s === n ? (z = a, a = n) : (c = $(), l = ci(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, W === 0 && J(Ce)), s === n ? (z = a, a = n) : (c = $(), l = ci(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			B = t, t = Pn(r, i);
		} else z = t, t = n;
		return t;
	}
	function ci() {
		let e, t, r, i;
		return e = z, t = $i(), t === n ? (z = e, e = n) : ($(), r = oi(), r === n ? (z = e, e = n) : ($(), i = ea(), i === n ? (z = e, e = n) : (B = e, e = Fn(r)))), e === n && (e = ni(), e === n && (e = Y(), e === n && (e = li()))), e;
	}
	function li() {
		let e, t, r;
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = Br(), r === n ? (z = e, e = n) : (B = e, e = In(r))), e === n && (e = z, t = Ci(), t === n ? (z = e, e = n) : (r = Br(), r === n ? (z = e, e = n) : (B = e, e = Ln(r)))), e;
	}
	function ui() {
		let e, t, r, i, a, o, s, c, l;
		return e = z, t = z, r = la(), r === n ? (z = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (z = e, e = n) : (i = $(), a = z, o = la(), o === n ? (z = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = z, s = Qi(), s === n ? (z = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), B = e, e = Rn(t, a, o)), e;
	}
	function di() {
		let e, t;
		return e = Jr(), e === n && (e = ui(), e === n && (e = z, t = Ei(), t !== n && (B = e, t = zn()), e = t, e === n && (e = z, t = la(), t !== n && (B = e, t = Bn(t)), e = t, e === n && (e = z, t = da(), t !== n && (B = e, t = j(t)), e = t, e === n && (e = z, t = yi(), t !== n && (B = e, t = Vn(t)), e = t))))), e;
	}
	function fi() {
		let e, t, r;
		return e = z, t = na(), t === n ? (z = e, e = n) : (r = ra(), B = e, e = Hn(t, r)), e;
	}
	function Y() {
		let e, t;
		return e = z, t = pi(), t !== n && (B = e, t = M(t)), e = t, e === n && (e = z, t = sa(), t !== n && (B = e, t = Un(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = Wn()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = Gn()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = Kn()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return W++, e = z, t = da(), t !== n && (B = e, t = N(t)), e = t, W--, e === n && (t = n, W === 0 && J(we)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = z, t = Ji(), t === n ? (z = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (z = e, e = n) : (B = e, e = qn(r))), e;
	}
	function hi() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = gi(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = gi(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = gi(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = P(t, r);
		} else z = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = z, t = da(), t === n ? (z = e, e = n) : ($(), r = Qi(), r === n ? (z = e, e = n) : ($(), i = Y(), i === n ? (z = e, e = n) : (B = e, e = Jn(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = F(r))), e;
	}
	function vi() {
		let e, t, r, i, a, o, s, c;
		if (e = z, t = Y(), t !== n) {
			for (r = [], i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = Y(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = z, a = $(), o = X(), o === n ? (z = i, i = n) : (s = $(), c = Y(), c === n ? (z = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			B = e, e = Yn(t, r);
		} else z = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = z, r = z, i = z, a = e.charAt(z), y.test(a) ? z++ : (a = n, W === 0 && J(Te)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else z = i, i = n;
		if (r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = I(r)), t = r, t === n) {
			if (t = z, r = z, i = [], a = e.charAt(z), b.test(a) ? z++ : (a = n, W === 0 && J(Ee)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(z), b.test(a) ? z++ : (a = n, W === 0 && J(Ee));
			else i = n;
			r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = Xn(r)), t = r, t === n && (t = z, r = Gi(), r !== n && (B = t, r = L()), t = r, t === n && (t = z, r = Ki(), r !== n && (B = t, r = tr()), t = r, t === n && (t = z, r = qi(), r !== n && (B = t, r = nr()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(z), ie.test(t) ? z++ : (t = n, W === 0 && J(De)), t === n && (t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, W === 0 && J(Oe)), r === n ? (z = t, t = n) : (i = z, W++, a = e.charAt(z), ae.test(a) ? z++ : (a = n, W === 0 && J(ke)), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = z, t = ia(), t !== n && (B = e, t = rr(t)), e = t, e === n && (e = z, t = Gi(), t !== n && (B = e, t = ir()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = ar()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = or()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(z) === 36 ? (t = "$", z++) : (t = n, W === 0 && J(Ae)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(z) === 64 ? (t = "@", z++) : (t = n, W === 0 && J(je)), t;
	}
	function wi() {
		let t;
		return e.substr(z, 2) === ".." ? (t = "..", z += 2) : (t = n, W === 0 && J(Me)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(z) === 46 ? (t = ".", z++) : (t = n, W === 0 && J(Ne)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(z) === 42 ? (t = "*", z++) : (t = n, W === 0 && J(Pe)), t;
	}
	function Di() {
		let t;
		return e.substr(z, 2) === "&&" ? (t = "&&", z += 2) : (t = n, W === 0 && J(Fe)), t;
	}
	function Oi() {
		let t;
		return e.substr(z, 2) === "||" ? (t = "||", z += 2) : (t = n, W === 0 && J(Ie)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(z) === 33 ? (t = "!", z++) : (t = n, W === 0 && J(Le)), t;
	}
	function Ai() {
		let t;
		return e.substr(z, 2) === "==" ? (t = "==", z += 2) : (t = n, W === 0 && J(Re)), t;
	}
	function ji() {
		let t;
		return e.substr(z, 2) === "!=" ? (t = "!=", z += 2) : (t = n, W === 0 && J(ze)), t;
	}
	function Mi() {
		let t;
		return e.substr(z, 2) === ">=" ? (t = ">=", z += 2) : (t = n, W === 0 && J(Be)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(z) === 62 ? (t = ">", z++) : (t = n, W === 0 && J(Ve)), t;
	}
	function Pi() {
		let t;
		return e.substr(z, 2) === "<=" ? (t = "<=", z += 2) : (t = n, W === 0 && J(He)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(z) === 60 ? (t = "<", z++) : (t = n, W === 0 && J(D)), t;
	}
	function Ii() {
		let t;
		return e.substr(z, 2) === "=~" ? (t = "=~", z += 2) : (t = n, W === 0 && J(Ue)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = z, e.substr(z, 2) === "in" ? (r = "in", z += 2) : (r = n, W === 0 && J(We)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = z, e.substr(z, 3) === "nin" ? (r = "nin", z += 3) : (r = n, W === 0 && J(Ge)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = z, e.substr(z, 8) === d ? (r = d, z += 8) : (r = n, W === 0 && J(Ke)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === f ? (r = f, z += 5) : (r = n, W === 0 && J(qe)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === p ? (r = p, z += 6) : (r = n, W === 0 && J(Je)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === m ? (r = m, z += 6) : (r = n, W === 0 && J(Ye)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === ee ? (r = ee, z += 4) : (r = n, W === 0 && J(Xe)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === h ? (r = h, z += 5) : (r = n, W === 0 && J(Ze)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === te ? (r = te, z += 4) : (r = n, W === 0 && J(Qe)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === ne ? (r = ne, z += 5) : (r = n, W === 0 && J($e)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === g ? (r = g, z += 4) : (r = n, W === 0 && J(et)), r === n ? (z = t, t = n) : (i = z, W++, a = Q(), W--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(z) === 123 ? (t = "{", z++) : (t = n, W === 0 && J(tt)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(z) === 125 ? (t = "}", z++) : (t = n, W === 0 && J(nt)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(z) === 91 ? (t = "[", z++) : (t = n, W === 0 && J(rt)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(z) === 93 ? (t = "]", z++) : (t = n, W === 0 && J(it)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(z) === 58 ? (t = ":", z++) : (t = n, W === 0 && J(at)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(z) === 44 ? (t = ",", z++) : (t = n, W === 0 && J(ot)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(z) === 40 ? (t = "(", z++) : (t = n, W === 0 && J(st)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(z) === 41 ? (t = ")", z++) : (t = n, W === 0 && J(ct)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(z) === 63 ? (t = "?", z++) : (t = n, W === 0 && J(lt)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (W++, t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, W === 0 && J(dt)), r !== n) {
			for (i = [], a = e.charAt(z), x.test(a) ? z++ : (a = n, W === 0 && J(ft)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, W === 0 && J(pt)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, W === 0 && J(mt)), s === n ? (z = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(z), x.test(a) ? z++ : (a = n, W === 0 && J(ft)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, W === 0 && J(pt)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, W === 0 && J(mt)), s === n ? (z = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(z) === 47 ? (a = "/", z++) : (a = n, W === 0 && J(dt)), a === n ? (z = t, t = n) : (B = t, t = sr(i));
		} else z = t, t = n;
		return W--, t === n && (r = n, W === 0 && J(ut)), t;
	}
	function ra() {
		let t, r, i;
		for (t = z, r = [], i = e.charAt(z), oe.test(i) ? z++ : (i = n, W === 0 && J(ht)); i !== n;) r.push(i), i = e.charAt(z), oe.test(i) ? z++ : (i = n, W === 0 && J(ht));
		return B = t, r = cr(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = z, r = z, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else z = r, r = n;
		return t = r === n ? r : e.substring(t, z), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(z), se.test(t) ? z++ : (t = n, W === 0 && J(gt)), t === n && (t = z, r = e.charAt(z), ce.test(r) ? z++ : (r = n, W === 0 && J(_t)), r === n ? (z = t, t = n) : (i = e.charAt(z), le.test(i) ? z++ : (i = n, W === 0 && J(vt)), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(z), S.test(t) ? z++ : (t = n, W === 0 && J(O))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (W++, t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, W === 0 && J(Oe)), r === n && (r = null), i = ca(), i !== n) {
			if (a = z, e.charCodeAt(z) === 46 ? (o = ".", z++) : (o = n, W === 0 && J(Ne)), o !== n) {
				if (s = [], c = e.charAt(z), S.test(c) ? z++ : (c = n, W === 0 && J(O)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(z), S.test(c) ? z++ : (c = n, W === 0 && J(O));
				else s = n;
				s === n ? (z = a, a = n) : (o = [o, s], a = o);
			} else z = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), B = t, t = lr(a, o);
		} else z = t, t = n;
		return W--, t === n && (r = n, W === 0 && J(yt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(z) === 48 ? (t = "0", z++) : (t = n, W === 0 && J(bt)), t === n) {
			if (t = z, r = e.charAt(z), ue.test(r) ? z++ : (r = n, W === 0 && J(xt)), r !== n) {
				for (i = [], a = e.charAt(z), S.test(a) ? z++ : (a = n, W === 0 && J(O)); a !== n;) i.push(a), a = e.charAt(z), S.test(a) ? z++ : (a = n, W === 0 && J(O));
				r = [r, i], t = r;
			} else z = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (W++, t = z, e.charCodeAt(z) === 48 ? (r = "0", z++) : (r = n, W === 0 && J(bt)), r === n) {
			if (r = z, e.charCodeAt(z) === 45 ? (i = "-", z++) : (i = n, W === 0 && J(Oe)), i === n && (i = null), a = e.charAt(z), ue.test(a) ? z++ : (a = n, W === 0 && J(xt)), a !== n) {
				for (o = [], s = e.charAt(z), S.test(s) ? z++ : (s = n, W === 0 && J(O)); s !== n;) o.push(s), s = e.charAt(z), S.test(s) ? z++ : (s = n, W === 0 && J(O));
				i = [
					i,
					a,
					o
				], r = i;
			} else z = r, r = n;
		}
		return r !== n && (B = t, r = ur()), t = r, W--, t === n && (r = n, W === 0 && J(k)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = z, r = e.charAt(z), C.test(r) ? z++ : (r = n, W === 0 && J(St)), r !== n) {
			if (i = e.charAt(z), _.test(i) ? z++ : (i = n, W === 0 && J(Se)), i === n && (i = null), a = [], o = e.charAt(z), S.test(o) ? z++ : (o = n, W === 0 && J(O)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(z), S.test(o) ? z++ : (o = n, W === 0 && J(O));
			else a = n;
			a === n ? (z = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else z = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (W++, t = z, e.charCodeAt(z) === 34 ? (r = "\"", z++) : (r = n, W === 0 && J(Ct)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(z) === 34 ? (a = "\"", z++) : (a = n, W === 0 && J(Ct)), a === n ? (z = t, t = n) : (B = t, t = dr(i));
		} else z = t, t = n;
		if (t === n) {
			if (t = z, e.charCodeAt(z) === 39 ? (r = "'", z++) : (r = n, W === 0 && J(wt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(z) === 39 ? (a = "'", z++) : (a = n, W === 0 && J(wt)), a === n ? (z = t, t = n) : (B = t, t = fr(i));
			} else z = t, t = n;
		}
		return W--, t === n && (r = n, W === 0 && J(we)), t;
	}
	function fa() {
		let t, r, i;
		return t = z, r = z, W++, i = e.charAt(z), de.test(i) ? z++ : (i = n, W === 0 && J(Tt)), W--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = pr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(pt)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 34 ? (i = "\"", z++) : (i = n, W === 0 && J(Ct)), i === n ? (z = t, t = n) : (B = t, t = mr())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(pt)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = hr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = z, r = z, W++, i = e.charAt(z), w.test(i) ? z++ : (i = n, W === 0 && J(Et)), W--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = gr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(pt)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 39 ? (i = "'", z++) : (i = n, W === 0 && J(wt)), i === n ? (z = t, t = n) : (B = t, t = _r())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(pt)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = vr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(z), fe.test(t) ? z++ : (t = n, W === 0 && J(Dt)), t === n && (t = z, r = z, i = e.charAt(z), ce.test(i) ? z++ : (i = n, W === 0 && J(_t)), i === n ? (z = r, r = n) : (a = e.charAt(z), le.test(a) ? z++ : (a = n, W === 0 && J(vt)), a === n ? (z = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, z)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, W === 0 && J(pt)), r !== n && (B = t, r = yr()), t = r, t === n && (t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, W === 0 && J(dt)), r !== n && (B = t, r = br()), t = r, t === n && (t = z, e.charCodeAt(z) === 98 ? (r = "b", z++) : (r = n, W === 0 && J(Ot)), r !== n && (B = t, r = xr()), t = r, t === n && (t = z, e.charCodeAt(z) === 102 ? (r = "f", z++) : (r = n, W === 0 && J(kt)), r !== n && (B = t, r = Sr()), t = r, t === n && (t = z, e.charCodeAt(z) === 110 ? (r = "n", z++) : (r = n, W === 0 && J(At)), r !== n && (B = t, r = Cr()), t = r, t === n && (t = z, e.charCodeAt(z) === 114 ? (r = "r", z++) : (r = n, W === 0 && J(jt)), r !== n && (B = t, r = wr()), t = r, t === n && (t = z, e.charCodeAt(z) === 116 ? (r = "t", z++) : (r = n, W === 0 && J(Mt)), r !== n && (B = t, r = Tr()), t = r, t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, W === 0 && J(Nt)), r === n ? (z = t, t = n) : (i = z, a = z, o = e.charAt(z), T.test(o) ? z++ : (o = n, W === 0 && J(Pt)), o === n ? (z = a, a = n) : (s = e.charAt(z), pe.test(s) ? z++ : (s = n, W === 0 && J(Ft)), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (e.substr(z, 2) === "\\u" ? (a = "\\u", z += 2) : (a = n, W === 0 && J(It)), a === n ? (z = t, t = n) : (o = z, s = z, c = e.charAt(z), T.test(c) ? z++ : (c = n, W === 0 && J(Pt)), c === n ? (z = s, s = n) : (l = e.charAt(z), E.test(l) ? z++ : (l = n, W === 0 && J(Lt)), l === n ? (z = s, s = n) : (u = Z(), u === n ? (z = s, s = n) : (d = Z(), d === n ? (z = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, z), o === n ? (z = t, t = n) : (B = t, t = R(i, o))))), t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, W === 0 && J(Nt)), r === n ? (z = t, t = n) : (i = z, a = z, o = Z(), o === n ? (z = a, a = n) : (s = Z(), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (B = z, a = Er(i), a = a ? n : void 0, a === n ? (z = t, t = n) : (B = t, t = Dr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(z), me.test(t) ? z++ : (t = n, W === 0 && J(Rt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(z), ie.test(t) ? z++ : (t = n, W === 0 && J(De)), t;
	}
	function $() {
		let t, r;
		for (W++, t = [], r = e.charAt(z), he.test(r) ? z++ : (r = n, W === 0 && J(zt)); r !== n;) t.push(r), r = e.charAt(z), he.test(r) ? z++ : (r = n, W === 0 && J(zt));
		return W--, t;
	}
	function ga() {
		let t, r;
		return t = z, W++, e.length > z ? (r = e.charAt(z), z++) : (r = n, W === 0 && J(mt)), W--, r === n ? t = void 0 : (z = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && Ar("Member name too long (maximum 1000 characters)"), e;
	}
	G = a();
	let va = G !== n && z === e.length;
	function ya() {
		throw G !== n && z < e.length && J(Nr()), Rr(U, H < e.length ? jr(H) : null, H < e.length ? Ir(H, H + 1) : Ir(H, H));
	}
	if (t.peg$library) return {
		peg$result: G,
		peg$currPos: z,
		peg$FAILED: n,
		peg$maxFailExpected: U,
		peg$maxFailPos: H,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return G;
	ya();
}
var nr = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), rr = {
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
}, ir = (e) => {
	throw new zn(1, 1, e);
}, ar = (e) => e.type === "root" || e.type === "current", or = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function sr(e) {
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
		if (ar(i)) r === "value" && !or(i) && ir("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && ir(`Expected a query, found ${String(i.type)}`), i.type) {
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
				let e = nr.has(i.operator) ? "value" : "any";
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
				let e = i.name, n = rr[e], a = i.args;
				a.length !== n.args.length && ir(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && ir(`The result of ${e}() must be compared`), r === "value" && n.logical && ir(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
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
			case "value": r === "test" && ir("A literal must be compared");
		}
	}
}
function cr(e) {
	let t;
	try {
		t = tr(e);
	} catch (e) {
		if (qn(e)) throw new zn(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new zn(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new zn(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return sr(t), t;
}
var lr = /* @__PURE__ */ new Set([
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
]), ur = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), dr = (e) => e >= 55296 && e <= 56319, fr = (e) => e >= 56320 && e <= 57343, pr = (e) => e !== void 0 && e >= "0" && e <= "9", mr = (e, t) => {
	let n = e.charCodeAt(t);
	return dr(n) && fr(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : dr(n) || fr(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, hr = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !lr.has(n) ? null : n === "n" ? {
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
}, gr = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return ur.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, _r = (e, t) => {
	let n = e[t];
	return n === "\\" ? hr(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : mr(e, t);
}, vr = (e, t) => {
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
			let t = gr(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = _r(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = _r(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, yr = (e, t) => {
	let n = t + 1, r = n;
	for (; pr(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; pr(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, br = (e) => {
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
				let e = i ? yr(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = vr(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = gr(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = hr(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = mr(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, xr = 1e3, Sr = 1e3, Cr = 16, wr = /^[dgimsuy]*$/, Tr = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, R = class extends Error {}, Er = 0, Dr = 1, z = 2, B = 3, V = 4, H = 5, U = In(2, 31) - 1, W = (e, t) => {
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
	return e.scratch = void 0, (r.gen > U - t - 2 || r.step > U - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Or = /* @__PURE__ */ new Set([
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
]), G = /^\{(\d+)(?:,(\d*))?\}/, kr = /^[0-9a-fA-F]{4}/, Ar = /^\(\?([ims]*)(?:-([ims]*))?:/, jr = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, K = class {
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
		if (this.i < this.src.length) throw new R("unexpected character");
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
				let r = Ar.exec(e.slice(t, t + 12));
				if (!r) throw new R("lookaround or named group");
				let i = Rn({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new R("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new R("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new R("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Or.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new R("trailing backslash");
		if (r === "b" || r === "B") throw new R("word boundary");
		if (r >= "1" && r <= "9") throw new R("backreference");
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
			if (n === -1) throw new R("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && kr.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (kr.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
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
			let n = G.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > xr || i !== Infinity && i > xr) throw new R("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, q = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= xr) throw new R("pattern too large");
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
		this.emit(H);
	}
	compile(e) {
		if (++this.work > 4 * xr) throw new R("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Er, this.atomId(e));
				return;
			case "bol":
				this.emit(B, +!!e.multiline);
				return;
			case "eol":
				this.emit(V, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(Dr);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(z)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(Dr);
					this.x[t] = t + 1, this.compile(e.node), this.emit(z, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(Dr);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Mr = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new K(e, r, t, n).parse(), a = new q(r);
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
}, Nr = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: te, atomHit: ne } = r, g = r.gen, re = r.step;
	r.gen = g + t.length + 2, r.step = re + t.length + 2;
	let _ = 0, v = !1, y = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== g) switch (ee[r] = g, ++c === 64 && (u(c), c = 0), i[r]) {
				case Er:
					e[n++] = r;
					break;
				case H: return u(c), v = !0, n;
				case z:
					h[s++] = a[r];
					break;
				case Dr:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case B:
					(_ === 0 || a[r] === 1 && jr(t.charCodeAt(_ - 1))) && (h[s++] = r + 1);
					break;
				case V: (_ === t.length || a[r] === 1 && jr(t.charCodeAt(_))) && (h[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (g++, p = y(d, 0, 0), v) return !0;
	for (; _ < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(_) : t.charCodeAt(_)) > 65535 ? 2 : 1, n = t.slice(_, _ + e), r = re + _ + 1;
		g++, m = 0, _ += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (te[i] !== r) {
				te[i] = r;
				let e = s[i];
				ne[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (ne[i] === 1 && (m = y(f, m, t + 1), v)) return !0;
		}
		if (!l && (m = y(f, m, 0), v)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, Pr = (e, t, n) => {
	let r = W(e, t.length);
	try {
		return Nr(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Fr = 256, Ir = /* @__PURE__ */ new Map(), J = 0, Lr = (e, t, n, r, i = !1) => {
	if (e.length > Sr || t.length > 7 || !wr.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = Ir.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Tr(s) > Cr ? null : Mr(n ? `^(?:${s})$` : s, t, i);
	J >= Fr && (Ir.clear(), J = 0);
	let l = Ir.get(s);
	return l === void 0 && Ir.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), J++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, Rr = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Pr(e, t, n);
}, zr = class {
	constructor(e) {
		this.nodes = e;
	}
}, Br = (e) => {
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
}, Vr = (e) => {
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
	return !Br(e);
}, Hr = 256, Ur = /* @__PURE__ */ new Map(), Wr = (e, t) => {
	let n = Ur.get(e);
	return n === void 0 && (n = Vr(e), Ur.size >= Hr && Ur.clear(), Ur.set(Array.from(e).join(""), n)), t(e.length), n;
}, Gr = /* @__PURE__ */ new Map(), Kr = (e, t) => {
	let n = Gr.get(e);
	return n === void 0 && (n = br(e), n !== null && (n = Array.from(n).join("")), Gr.size >= Hr && Gr.clear(), Gr.set(Array.from(e).join(""), n)), t(e.length), n;
}, qr = 256, Jr = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > Sr) c = null;
		else if (o) {
			let n = Kr(e, i);
			c = n === null ? null : Lr(n, t, r, i, !0);
		} else c = Wr(e, i) ? Lr(e, t, r, i) : null;
		s !== void 0 && (s.size >= qr && s.clear(), s.set(a, c));
	}
	return c !== null && Rr(c, n, i);
}, Yr = {
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
			let e = Kn(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !I(r) || !I(i) ? !1 : Jr(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !I(r) || !I(i) ? !1 : Jr(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, Xr = (e, t, n = j) => e === void 0 && t === void 0 || Hn(e, t, n), Zr = (e, t, n = j) => !Hn(e, t, n), Qr = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, $r = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return Qr(n) - Qr(i);
	}
	return e.length - t.length;
}, ei = (e, t, n = j) => Yn(e) && Yn(t) ? e < t : I(e) && I(t) ? (n(Math.min(e.length, t.length)), $r(e, t) < 0) : !1, ti = (e, t, n = j) => ei(e, t, n) || Xr(e, t, n), ni = (e, t, n = j) => Yn(e) && Yn(t) ? e > t : I(e) && I(t) ? (n(Math.min(e.length, t.length)), $r(e, t) > 0) : !1, ri = (e, t, n = j) => ni(e, t, n) || Xr(e, t, n), ii = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, ai = (e, t, n) => {
	let r = N(e);
	for (let i = 0; i < r; i++) {
		let r = Un(e, i);
		if (n(1 + ii(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, oi = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, si = (e) => typeof e == "string" && e.length + 1 > Wn, ci = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = N(e);
	for (let n = 0; n < a; n++) {
		let r = Un(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), si(r) ? i.long.push(r) : i.set.add(oi(r));
	}
	return n?.set(e, i), i;
}, li = ({ set: e, long: t }, n, r) => {
	if (si(n)) {
		for (let e of t) if (r(1 + ii(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(oi(n)));
}, ui = (e, t, n) => {
	let r = N(e);
	for (let i = 0; i < r; i++) if (n(), M(e, i) && t(e[i])) return !0;
	return !1;
}, di = {
	eq: Xr,
	ne: Zr,
	lt: ei,
	le: ti,
	gt: ni,
	ge: ri,
	in: (e, t, n = j) => P(t) ? ai(t, e, n) !== -1 : !1,
	nin: (e, t, n = j) => P(t) ? ai(t, e, n) === -1 : !1,
	subsetof: (e, t, n = j, r) => {
		if (!P(e) || !P(t)) return !1;
		let i = ci(t, n, r);
		return !ui(e, (e) => !li(i, e, n), n);
	},
	anyof: (e, t, n = j, r) => {
		if (!P(e) || !P(t)) return !1;
		let i = ci(t, n, r);
		return ui(e, (e) => li(i, e, n), n);
	},
	noneof: (e, t, n = j, r) => {
		if (!P(e) || !P(t)) return !1;
		let i = ci(t, n, r);
		return !ui(e, (e) => li(i, e, n), n);
	},
	sizeof: (e, t) => !P(e) && !I(e) || !P(t) && !I(t) ? !1 : (P(e) ? N(e) : e.length) === (P(t) ? N(t) : t.length),
	size: (e, t) => !P(e) && !I(e) || !Yn(t) ? !1 : (P(e) ? N(e) : e.length) === t
}, fi = (e) => !P(e) && !I(e) ? !1 : (P(e) ? N(e) : e.length) === 0, Y = (e, t, n, r = j, i) => !I(e) || !I(t) ? !1 : Jr(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), pi = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), mi = (e, t) => e.concat(`[${t}]`), hi = (e, t) => e < 0 ? t + e : e, gi = (e, t) => {
	let n = N(e), r = hi(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: M(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, _i = (e, t) => {
	for (let n of t) e.push(n);
}, vi = 1e6, yi = 100, bi = 1e6, xi = 20, Si = 1e4, Ci = 1e4, wi = class {
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
				else if (++e.holes > Ci) {
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
}, Ti = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, pi(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = pi(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = N(e);
			for (let r = 0; r < n; r++) this.tick(), M(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new wi(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Si, Math.ceil((this.retained - this.retainedLimit) / xi))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new Bn(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(vi, yi * e.weight) + t, this.retainedLimit = Math.max(bi, xi * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new wi(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Si, Math.ceil((this.steps - this.stepLimit) / yi))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new Bn(`Query exceeded ${this.stepLimit} evaluation steps`);
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
						paths: mi(t, r)
					});
				}), n;
			}
			if (F(e)) {
				let n = Kn(e);
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
			let r = gi(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: mi(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (P(e)) {
				let r = gi(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: mi(t, r.index)
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
			i > 0 ? (a = n.start === null ? 0 : hi(n.start, r), o = n.end === null ? r : hi(n.end, r)) : (a = n.start === null ? r - 1 : hi(n.start, r), o = n.end === null ? -r - 1 : hi(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: M(e, u) ? e[u] : void 0,
				paths: mi(t, u)
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
					_i(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": _i(n, this.handleBracketExpressionContent(e, r));
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
						_i(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						_i(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						L(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (F(e)) {
					let t = Kn(e);
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
							paths: mi(e.parent.paths, t)
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
						if (!Yn(i) || !Yn(r)) i = void 0;
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
					return Yn(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return fi(n);
			if (t.operator === "reg") return Y(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = di[t.operator];
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
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new zr(r.value) : new zr(L(r?.value) ? [r?.value] : []);
			}), i = Yr[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
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
							paths: mi(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (F(n)) {
						let i = Kn(n);
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
				if (o === null) _i(n, a);
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
				throw qn(e) ? new Bn("Query is nested too deeply") : Jn(e) ? new Bn("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? vi, this.retainedLimit = this.adaptiveLimit ? bi : Infinity;
	}
}, Ei = (e, t, n) => {
	let r = cr(t), i = new Ti(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? Xn(i) ? [] : [i.value] : i?.value;
}, Di = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Ei(e, i, n);
		L(t) && r.push(t);
	}
	return r;
}, Oi = (e, t, n = {}) => {
	try {
		return P(t) ? Di(e, t, n) : Ei(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, ki = (e) => typeof e == "object" && !!e && !Array.isArray(e), Ai = (e, t) => {
	if (!ki(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = Li(t, i);
	return n;
}, ji = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => Li(t, e));
}, Mi = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, Ni = (e, t) => Mi(e, t), Pi = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Fi = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Ii = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Fi,
		applyTemplate: e
	});
}, Li = (e, t, n) => {
	let r = e, i = t;
	Pi(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Mi(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = Ni(a?.textContent, r)), "attributes" in a && (a.attributes = Ai(a?.attributes, r)), "children" in a && (a.children = ji(a?.children, r))), a);
};
Ii(Li);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var Ri = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, zi = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
};
((e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: zi,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
})((e, t) => {
	let n = e;
	return Ri(n, t), n.map((e) => Li(e, e[t]));
}, (e, t) => {
	let n = e, r = t;
	return Ri(n, r), n.map((e) => Li(e, r));
});
// node_modules/json-transformer-funcs/src/v24/findByRole.js
var Bi = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = Bi(n, t);
		if (e) return e;
	}
	return null;
}, Vi = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = Oi(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = Bi(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
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
}, Hi = (e, t, n, r) => {
	let { parent: i, key: a } = Vi(e, t, r);
	return (jn[t.action] || An)(i, a, n), e;
}, Ui = (e) => typeof e == "object" && !!e && !Array.isArray(e), Wi = (e, t) => {
	if (!Ui(e)) return null;
	if (e[t] !== void 0) return e[t];
	let n = `show${t.charAt(0).toUpperCase()}${t.slice(1)}`;
	return e[n] === void 0 ? null : e[n];
}, Gi = (e, n) => {
	let r = i[e];
	if (r) for (let e of r) {
		if (e.skipIf && Oi(n, e.skipIf, { returnArray: !0 }).length > 0) continue;
		let r = t[e.templateKey];
		try {
			Hi({ base: n }, e.destinationPath, r);
		} catch {}
	}
}, Ki = ({ options: e = {}, optionDefs: t = {}, base: n, showLog: r = !1 } = {}) => {
	if (!n || !Ui(e) || !Ui(t)) return n;
	for (let [r, i] of Object.entries(t)) {
		if (!Ui(i)) continue;
		let t = Wi(e, r);
		if (!t) continue;
		let a = typeof t == "boolean" && t === !0, o = Ui(t);
		if ((a || o) && Object.entries(i).some(([e]) => e !== "initialize" && (a || t[e] === !0))) {
			i.initialize && Gi(i.initialize, n);
			for (let [e, r] of Object.entries(i)) e !== "initialize" && (a || t[e] === !0) && Gi(r, n);
		}
	}
	return n;
}, qi = {
	name: "json-renderers-run-instructions",
	version: "1.14.1"
}, Ji = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.render = {
		meta: qi,
		renderFunc: e
	});
}, Yi = ({ instructionMainKey: n, instructionSubKey: r, data: i, options: a, showLog: o = !1 } = {}) => {
	let s = e[n]?.[r];
	if (!s) throw Error(`Definition not found: ${n}.${r}`);
	let c = structuredClone(t[s.baseFromSpec]);
	return On({
		instructions: s.instructions ?? [],
		base: c,
		data: i,
		showLog: o
	}), Ki({
		options: a,
		optionDefs: s.options && typeof s.options == "object" ? s.options : e[n]?.options ?? {},
		base: c,
		data: i,
		showLog: o
	}), c;
};
Ji(Yi);
export { Yi as default };
