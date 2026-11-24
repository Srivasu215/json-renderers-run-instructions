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
// node_modules/spec-repo/src/v19/index.js
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
// ../json-renderers-run-instructions-steps/node_modules/declarative-instructions/src/v1/index.js
var f = {
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
}, p = (e) => typeof e == "object" && !!e && !Array.isArray(e), m = (e, t) => {
	if (!p(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = _(t, i);
	return n;
}, ee = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => _(t, e));
}, h = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, te = (e, t) => h(e, t), ne = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, g = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, re = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: g,
		applyTemplate: e
	});
}, _ = (e, t, n) => {
	let r = e, i = t;
	ne(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? h(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = te(a?.textContent, r)), "attributes" in a && (a.attributes = m(a?.attributes, r)), "children" in a && (a.children = ee(a?.children, r))), a);
};
re(_);
// ../json-renderers-run-instructions-steps/node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var v = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, ie = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, ae = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: ie,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, oe = (e, t) => {
	let n = e, r = t;
	return v(n, r), n.map((e) => _(e, r));
};
ae((e, t) => {
	let n = e;
	return v(n, t), n.map((e) => _(e, e[t]));
}, oe);
// ../json-renderers-run-instructions-steps/node_modules/json-transformer-funcs-two-dimensions/src/v9/index.js
var se = ({ outer: e = [], outerSpec: t, getInner: n, innerSpec: r } = {}) => e.map((e) => {
	let i = _(e, t), a = n ? n(e) : [];
	return i.children = a.length > 0 ? oe(a, r) : [], i;
}), ce = ({ columns: e = [], data: t = [], columnSpec: n, rowSpec: r } = {}) => se({
	outer: Array.isArray(t) ? t : t?.data ?? t?.rows ?? [],
	outerSpec: r,
	innerSpec: n,
	getInner: (t) => e.map((e) => ({
		...e,
		rowValue: t[e.columnName]
	}))
}), le = ({ columns: e = [], data: t = [], rows: n, columnSpec: r, rowSpec: i } = {}) => {
	let a = n ?? (Array.isArray(t) ? t : t?.data ?? t?.rows ?? []);
	return se({
		outer: e,
		outerSpec: r,
		innerSpec: i,
		getInner: (e) => Array.isArray(e.options) && e.options.length > 0 ? e.options.map((e) => typeof e == "object" ? e : { rowValue: e }) : a.map((t) => ({
			...t,
			rowValue: t[e.columnName] ?? t.value ?? t
		}))
	});
}, ue = (e) => Array.isArray(e) ? e : [e], de = (e, t, n) => {
	e[t] = n;
}, fe = {
	set: de,
	push: (e, t, n) => {
		e[t].push(...ue(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...ue(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(ue(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(ue(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, y = Object.defineProperty, pe = Object.getOwnPropertySymbols, me = Object.prototype.hasOwnProperty, he = Object.prototype.propertyIsEnumerable, ge = Math.pow, _e = (e, t, n) => t in e ? y(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ve = (e, t) => {
	for (var n in t ||= {}) me.call(t, n) && _e(e, n, t[n]);
	if (pe) for (var n of pe(t)) he.call(t, n) && _e(e, n, t[n]);
	return e;
}, ye = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, be = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, b = () => void 0, xe = (e, t, n, r) => {
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
		let i = Ee(e), a = Ee(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, Se = (e, t, n = b) => {
	let r = [];
	if (!xe(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!xe(Ce(e.x, t), Ce(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !x(o, i) || !x(a, i)) return !1;
			let s = a[i];
			if (!x(o, i) || !xe(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, x = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Ce = (e, t) => x(e, t) ? e[t] : void 0, we = 16383, Te = 1e3, Ee = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > Te) throw new be(`Member name too long (maximum ${Te} characters)`);
	return t;
}, S = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, De = (e) => e instanceof RangeError && /call stack/i.test(e.message), C = (e) => Array.isArray(e), Oe = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), w = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, T = (e) => typeof e == "number", E = (e) => typeof e == "string", ke = (e) => e === void 0, D = (e) => e !== void 0;
function Ae(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function je(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function Me(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var Ne = class extends SyntaxError {
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
function Pe(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Br }, a = Br, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", te = "true", ne = "false", g = "null", re = /^[,\]]/, _ = /^[+\-]/, v = /^[*\/]/, ie = /^[a-zA-Z_]/, ae = /^[\x80-\uFFFF_]/, oe = /^[a-zA-Z0-9_]/, se = /^[0-9@$\-]/, ce = /^[^\/\\]/, le = /^[gimsuy]/, ue = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, de = /^[\uD800-\uDBFF]/, fe = /^[\uDC00-\uDFFF]/, y = /^[0-9]/, pe = /^[1-9]/, me = /^[eE]/, he = /^["\\]/, ge = /^['\\]/, _e = /^[ -\uD7FF\uE000-\uFFFF]/, ve = /^[dD]/, ye = /^[89abAB]/, be = /^[c-fC-F]/, b = /^[0-9a-fA-F]/, xe = /^[ \t\n\r]/, Se = K([",", "]"], !1, !1, !1), x = G("length", !1), Ce = G("count", !1), we = G("match", !1), Te = G("search", !1), Ee = G("value", !1), S = K(["+", "-"], !1, !1, !1), De = K(["*", "/"], !1, !1, !1), C = Fr("string"), Oe = K([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), w = K([["", "￿"], "_"], !1, !1, !1), T = K([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), E = G("-", !1), ke = K([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), D = G("$", !1), Pe = G("@", !1), Fe = G("..", !1), Ie = G(".", !1), Le = G("*", !1), Re = G("&&", !1), ze = G("||", !1), Be = G("!", !1), Ve = G("==", !1), He = G("!=", !1), Ue = G(">=", !1), We = G(">", !1), Ge = G("<=", !1), Ke = G("<", !1), qe = G("=~", !1), Je = G("in", !1), Ye = G("nin", !1), Xe = G("subsetof", !1), Ze = G("anyof", !1), Qe = G("noneof", !1), $e = G("sizeof", !1), et = G("size", !1), tt = G("empty", !1), nt = G("true", !1), rt = G("false", !1), it = G("null", !1), O = G("{", !1), at = G("}", !1), ot = G("[", !1), st = G("]", !1), ct = G(":", !1), lt = G(",", !1), ut = G("(", !1), dt = G(")", !1), ft = G("?", !1), pt = Fr("regex"), mt = G("/", !1), ht = K(["/", "\\"], !0, !1, !1), gt = G("\\", !1), _t = Nr(), k = K([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), vt = K([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), yt = K([["\ud800", "\udbff"]], !1, !1, !1), bt = K([["\udc00", "\udfff"]], !1, !1, !1), A = K([["0", "9"]], !1, !1, !1), xt = Fr("number"), St = G("0", !1), Ct = K([["1", "9"]], !1, !1, !1), wt = Fr("integer"), Tt = K(["e", "E"], !1, !1, !1), Et = G("\"", !1), Dt = G("'", !1), Ot = K(["\"", "\\"], !1, !1, !1), kt = K(["'", "\\"], !1, !1, !1), At = K([[" ", "퟿"], ["", "￿"]], !1, !1, !1), jt = G("b", !1), Mt = G("f", !1), Nt = G("n", !1), Pt = G("r", !1), Ft = G("t", !1), It = G("u", !1), Lt = K(["d", "D"], !1, !1, !1), Rt = K([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), zt = G("\\u", !1), Bt = K([["c", "f"], ["C", "F"]], !1, !1, !1), Vt = K([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Ht = K([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Ut(e) {
		return {
			type: "root",
			next: Ae(e)
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
		return Me(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function an(e, t) {
		return Me(e, t, (e, t) => ({
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
		return t !== null || je(e);
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
		return t.length === 0 ? e : Me(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function Rn(e, t) {
		return t.length === 0 ? e : Me(e, t, (e, t) => ({
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
			next: Ae(e)
		};
	}
	function Vn(e) {
		return {
			type: "current",
			next: Ae(e)
		};
	}
	function j(e, t, n) {
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
	function Un(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function M(e) {
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
	function qn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function N() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Jn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function P() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Yn(e) {
		return e;
	}
	function F(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Xn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function I(e, t) {
		return [e, t.value];
	}
	function Zn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function L(e, t) {
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
		let n = parseFloat(Ar());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && jr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function ur() {
		let e = parseInt(Ar(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && jr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
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
	function Er(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function R(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Dr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let z = t.peg$currPos | 0, B = z, V = [{
		line: 1,
		column: 1
	}], H = z, Or = t.peg$maxFailExpected || [], U = t.peg$silentFails | 0, kr = /* @__PURE__ */ new Map(), W;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function Ar() {
		return e.substring(B, z);
	}
	function jr(e, t) {
		throw t = t === void 0 ? Lr(B, z) : t, Rr(e, t);
	}
	function Mr(t = z) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function G(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function K(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Nr() {
		return { type: "any" };
	}
	function Pr() {
		return { type: "end" };
	}
	function Fr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Ir(t) {
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
		z < H || (z > H && (H = z, Or = []), Or.push(e));
	}
	function Rr(e, t) {
		return new Ne(e, null, null, t);
	}
	function zr(e, t, n) {
		return new Ne(Ne.buildMessage(e, t), e, t, n);
	}
	function Br() {
		let e, t, r, i;
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = Vr(), i = ga(), i === n ? (z = e, e = n) : (B = e, e = Ut(r))), e;
	}
	function Vr() {
		let e, t, r, i, a;
		for (e = z, t = [], r = z, i = $(), a = Hr(), a === n ? (z = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = z, i = $(), a = Hr(), a === n ? (z = r, r = n) : (i = [i, a], r = i);
		return B = e, t = Wt(t), e = t, e;
	}
	function Hr() {
		let e;
		return e = Wr(), e === n && (e = Ur()), e;
	}
	function Ur() {
		let e, t, r;
		return e = z, t = Ti(), t === n ? (z = e, e = n) : (r = Gr(), r === n ? (z = e, e = n) : (B = e, e = Gt(r))), e === n && (e = z, t = qr(), t !== n && (B = e, t = Kt(t)), e = t), e;
	}
	function Wr() {
		let e, t, r;
		return e = z, t = wi(), t === n ? (z = e, e = n) : (r = Kr(), r === n ? (z = e, e = n) : (B = e, e = qt(r))), e;
	}
	function Gr() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = Jt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = Yt(t)), e = t), e;
	}
	function Kr() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = Xt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = Zt(t)), e = t, e === n && (e = z, t = qr(), t !== n && (B = e, t = Qt(t)), e = t)), e;
	}
	function qr() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = Jr(), r === n ? (z = e, e = n) : ($(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = $t(r)))), e;
	}
	function Jr() {
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
			B = e, e = en(t, r);
		} else z = e, e = n;
		return e;
	}
	function Yr() {
		let t, r, i, a, o, s, c, l, u;
		return t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = $i(), i === n ? (z = t, t = n) : ($(), a = J(), a === n ? (z = t, t = n) : ($(), o = ea(), o === n ? (z = t, t = n) : (s = z, U++, c = z, l = $(), u = e.charAt(z), re.test(u) ? z++ : (u = n, U === 0 && q(Se)), u === n ? (z = c, c = n) : (l = [l, u], c = l), U--, c === n ? s = n : (z = s, s = void 0), s === n ? (z = t, t = n) : (B = t, t = tn(a)))))), t === n && (t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = J(), i === n ? (z = t, t = n) : (B = t, t = nn(i)))), t;
	}
	function J() {
		let e, t, r, i, a, o, s, c, l = z * 91 + 10, u = kr.get(l);
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
			B = e, e = rn(t, r);
		} else z = e, e = n;
		return kr.set(l, {
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
			B = e, e = an(t, r);
		} else z = e, e = n;
		return e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = $i(), r === n ? (z = e, e = n) : ($(), i = J(), i === n ? (z = e, e = n) : ($(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = on(i))))), e === n && (e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = ti(), r === n ? (z = e, e = n) : (B = e, e = sn(r))), e === n && (e = Qr())), e;
	}
	function Qr() {
		let e, t, r, i, a;
		return e = z, t = oi(), t === n ? (z = e, e = n) : (r = z, i = $(), a = $r(), a === n ? (z = r, r = n) : (i = [i, a], r = i), r === n && (r = null), B = z, i = cn(t, r), i = i ? void 0 : n, i === n ? (z = e, e = n) : (B = e, e = ln(t, r))), e === n && (e = ti()), e;
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
		return e = z, t = $i(), t === n ? (z = e, e = n) : ($(), r = J(), r === n ? (z = e, e = n) : ($(), i = ea(), i === n ? (z = e, e = n) : (B = e, e = En(r)))), e === n && (e = ni(), e === n && (e = li(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = Dn()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = On()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = kn()), e = t))))), e;
	}
	function ni() {
		let e, t, r, i, a;
		return e = z, t = ri(), t === n ? (z = e, e = n) : (r = $i(), r === n ? (z = e, e = n) : ($(), i = ii(), i === n && (i = null), $(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = An(t, i)))), e;
	}
	function ri() {
		let t, r;
		return t = z, e.substr(z, 6) === o ? (r = o, z += 6) : (r = n, U === 0 && q(x)), r !== n && (B = t, r = jn()), t = r, t === n && (t = z, e.substr(z, 5) === s ? (r = s, z += 5) : (r = n, U === 0 && q(Ce)), r !== n && (B = t, r = Mn()), t = r, t === n && (t = z, e.substr(z, 5) === c ? (r = c, z += 5) : (r = n, U === 0 && q(we)), r !== n && (B = t, r = Nn()), t = r, t === n && (t = z, e.substr(z, 6) === l ? (r = l, z += 6) : (r = n, U === 0 && q(Te)), r !== n && (B = t, r = Pn()), t = r, t === n && (t = z, e.substr(z, 5) === u ? (r = u, z += 5) : (r = n, U === 0 && q(Ee)), r !== n && (B = t, r = Fn()), t = r)))), t;
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
		let t, r, i, a, o, s, c, l, u = z * 91 + 21, d = kr.get(u);
		if (d) return z = d.nextPos, d.result;
		if (t = z, r = si(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), _.test(s) ? z++ : (s = n, U === 0 && q(S)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), _.test(s) ? z++ : (s = n, U === 0 && q(S)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			B = t, t = Ln(r, i);
		} else z = t, t = n;
		return kr.set(u, {
			nextPos: z,
			result: t
		}), t;
	}
	function si() {
		let t, r, i, a, o, s, c, l;
		if (t = z, r = ci(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, U === 0 && q(De)), s === n ? (z = a, a = n) : (c = $(), l = ci(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, U === 0 && q(De)), s === n ? (z = a, a = n) : (c = $(), l = ci(), l === n ? (z = a, a = n) : (o = [
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
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = Vr(), r === n ? (z = e, e = n) : (B = e, e = Bn(r))), e === n && (e = z, t = Ci(), t === n ? (z = e, e = n) : (r = Vr(), r === n ? (z = e, e = n) : (B = e, e = Vn(r)))), e;
	}
	function ui() {
		let e, t, r, i, a, o, s, c, l;
		return e = z, t = z, r = la(), r === n ? (z = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (z = e, e = n) : (i = $(), a = z, o = la(), o === n ? (z = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = z, s = Qi(), s === n ? (z = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), B = e, e = j(t, a, o)), e;
	}
	function di() {
		let e, t;
		return e = Yr(), e === n && (e = ui(), e === n && (e = z, t = Ei(), t !== n && (B = e, t = Hn()), e = t, e === n && (e = z, t = la(), t !== n && (B = e, t = Un(t)), e = t, e === n && (e = z, t = da(), t !== n && (B = e, t = M(t)), e = t, e === n && (e = z, t = yi(), t !== n && (B = e, t = Wn(t)), e = t))))), e;
	}
	function fi() {
		let e, t, r;
		return e = z, t = na(), t === n ? (z = e, e = n) : (r = ra(), B = e, e = Gn(t, r)), e;
	}
	function Y() {
		let e, t;
		return e = z, t = pi(), t !== n && (B = e, t = Kn(t)), e = t, e === n && (e = z, t = sa(), t !== n && (B = e, t = qn(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = N()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = Jn()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = P()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return U++, e = z, t = da(), t !== n && (B = e, t = Yn(t)), e = t, U--, e === n && (t = n, U === 0 && q(C)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = z, t = Ji(), t === n ? (z = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (z = e, e = n) : (B = e, e = F(r))), e;
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
			B = e, e = Xn(t, r);
		} else z = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = z, t = da(), t === n ? (z = e, e = n) : ($(), r = Qi(), r === n ? (z = e, e = n) : ($(), i = Y(), i === n ? (z = e, e = n) : (B = e, e = I(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = Zn(r))), e;
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
			B = e, e = L(t, r);
		} else z = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = z, r = z, i = z, a = e.charAt(z), ie.test(a) ? z++ : (a = n, U === 0 && q(Oe)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else z = i, i = n;
		if (r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = Qn(r)), t = r, t === n) {
			if (t = z, r = z, i = [], a = e.charAt(z), ae.test(a) ? z++ : (a = n, U === 0 && q(w)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(z), ae.test(a) ? z++ : (a = n, U === 0 && q(w));
			else i = n;
			r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = $n(r)), t = r, t === n && (t = z, r = Gi(), r !== n && (B = t, r = er()), t = r, t === n && (t = z, r = Ki(), r !== n && (B = t, r = tr()), t = r, t === n && (t = z, r = qi(), r !== n && (B = t, r = nr()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(z), oe.test(t) ? z++ : (t = n, U === 0 && q(T)), t === n && (t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, U === 0 && q(E)), r === n ? (z = t, t = n) : (i = z, U++, a = e.charAt(z), se.test(a) ? z++ : (a = n, U === 0 && q(ke)), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = z, t = ia(), t !== n && (B = e, t = rr(t)), e = t, e === n && (e = z, t = Gi(), t !== n && (B = e, t = ir()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = ar()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = or()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(z) === 36 ? (t = "$", z++) : (t = n, U === 0 && q(D)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(z) === 64 ? (t = "@", z++) : (t = n, U === 0 && q(Pe)), t;
	}
	function wi() {
		let t;
		return e.substr(z, 2) === ".." ? (t = "..", z += 2) : (t = n, U === 0 && q(Fe)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(z) === 46 ? (t = ".", z++) : (t = n, U === 0 && q(Ie)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(z) === 42 ? (t = "*", z++) : (t = n, U === 0 && q(Le)), t;
	}
	function Di() {
		let t;
		return e.substr(z, 2) === "&&" ? (t = "&&", z += 2) : (t = n, U === 0 && q(Re)), t;
	}
	function Oi() {
		let t;
		return e.substr(z, 2) === "||" ? (t = "||", z += 2) : (t = n, U === 0 && q(ze)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(z) === 33 ? (t = "!", z++) : (t = n, U === 0 && q(Be)), t;
	}
	function Ai() {
		let t;
		return e.substr(z, 2) === "==" ? (t = "==", z += 2) : (t = n, U === 0 && q(Ve)), t;
	}
	function ji() {
		let t;
		return e.substr(z, 2) === "!=" ? (t = "!=", z += 2) : (t = n, U === 0 && q(He)), t;
	}
	function Mi() {
		let t;
		return e.substr(z, 2) === ">=" ? (t = ">=", z += 2) : (t = n, U === 0 && q(Ue)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(z) === 62 ? (t = ">", z++) : (t = n, U === 0 && q(We)), t;
	}
	function Pi() {
		let t;
		return e.substr(z, 2) === "<=" ? (t = "<=", z += 2) : (t = n, U === 0 && q(Ge)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(z) === 60 ? (t = "<", z++) : (t = n, U === 0 && q(Ke)), t;
	}
	function Ii() {
		let t;
		return e.substr(z, 2) === "=~" ? (t = "=~", z += 2) : (t = n, U === 0 && q(qe)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = z, e.substr(z, 2) === "in" ? (r = "in", z += 2) : (r = n, U === 0 && q(Je)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = z, e.substr(z, 3) === "nin" ? (r = "nin", z += 3) : (r = n, U === 0 && q(Ye)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = z, e.substr(z, 8) === d ? (r = d, z += 8) : (r = n, U === 0 && q(Xe)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === f ? (r = f, z += 5) : (r = n, U === 0 && q(Ze)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === p ? (r = p, z += 6) : (r = n, U === 0 && q(Qe)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === m ? (r = m, z += 6) : (r = n, U === 0 && q($e)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === ee ? (r = ee, z += 4) : (r = n, U === 0 && q(et)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === h ? (r = h, z += 5) : (r = n, U === 0 && q(tt)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === te ? (r = te, z += 4) : (r = n, U === 0 && q(nt)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === ne ? (r = ne, z += 5) : (r = n, U === 0 && q(rt)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === g ? (r = g, z += 4) : (r = n, U === 0 && q(it)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(z) === 123 ? (t = "{", z++) : (t = n, U === 0 && q(O)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(z) === 125 ? (t = "}", z++) : (t = n, U === 0 && q(at)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(z) === 91 ? (t = "[", z++) : (t = n, U === 0 && q(ot)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(z) === 93 ? (t = "]", z++) : (t = n, U === 0 && q(st)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(z) === 58 ? (t = ":", z++) : (t = n, U === 0 && q(ct)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(z) === 44 ? (t = ",", z++) : (t = n, U === 0 && q(lt)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(z) === 40 ? (t = "(", z++) : (t = n, U === 0 && q(ut)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(z) === 41 ? (t = ")", z++) : (t = n, U === 0 && q(dt)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(z) === 63 ? (t = "?", z++) : (t = n, U === 0 && q(ft)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (U++, t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, U === 0 && q(mt)), r !== n) {
			for (i = [], a = e.charAt(z), ce.test(a) ? z++ : (a = n, U === 0 && q(ht)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, U === 0 && q(gt)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, U === 0 && q(_t)), s === n ? (z = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(z), ce.test(a) ? z++ : (a = n, U === 0 && q(ht)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, U === 0 && q(gt)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, U === 0 && q(_t)), s === n ? (z = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(z) === 47 ? (a = "/", z++) : (a = n, U === 0 && q(mt)), a === n ? (z = t, t = n) : (B = t, t = sr(i));
		} else z = t, t = n;
		return U--, t === n && (r = n, U === 0 && q(pt)), t;
	}
	function ra() {
		let t, r, i;
		for (t = z, r = [], i = e.charAt(z), le.test(i) ? z++ : (i = n, U === 0 && q(k)); i !== n;) r.push(i), i = e.charAt(z), le.test(i) ? z++ : (i = n, U === 0 && q(k));
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
		return t = e.charAt(z), ue.test(t) ? z++ : (t = n, U === 0 && q(vt)), t === n && (t = z, r = e.charAt(z), de.test(r) ? z++ : (r = n, U === 0 && q(yt)), r === n ? (z = t, t = n) : (i = e.charAt(z), fe.test(i) ? z++ : (i = n, U === 0 && q(bt)), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(z), y.test(t) ? z++ : (t = n, U === 0 && q(A))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (U++, t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, U === 0 && q(E)), r === n && (r = null), i = ca(), i !== n) {
			if (a = z, e.charCodeAt(z) === 46 ? (o = ".", z++) : (o = n, U === 0 && q(Ie)), o !== n) {
				if (s = [], c = e.charAt(z), y.test(c) ? z++ : (c = n, U === 0 && q(A)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(z), y.test(c) ? z++ : (c = n, U === 0 && q(A));
				else s = n;
				s === n ? (z = a, a = n) : (o = [o, s], a = o);
			} else z = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), B = t, t = lr(a, o);
		} else z = t, t = n;
		return U--, t === n && (r = n, U === 0 && q(xt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(z) === 48 ? (t = "0", z++) : (t = n, U === 0 && q(St)), t === n) {
			if (t = z, r = e.charAt(z), pe.test(r) ? z++ : (r = n, U === 0 && q(Ct)), r !== n) {
				for (i = [], a = e.charAt(z), y.test(a) ? z++ : (a = n, U === 0 && q(A)); a !== n;) i.push(a), a = e.charAt(z), y.test(a) ? z++ : (a = n, U === 0 && q(A));
				r = [r, i], t = r;
			} else z = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (U++, t = z, e.charCodeAt(z) === 48 ? (r = "0", z++) : (r = n, U === 0 && q(St)), r === n) {
			if (r = z, e.charCodeAt(z) === 45 ? (i = "-", z++) : (i = n, U === 0 && q(E)), i === n && (i = null), a = e.charAt(z), pe.test(a) ? z++ : (a = n, U === 0 && q(Ct)), a !== n) {
				for (o = [], s = e.charAt(z), y.test(s) ? z++ : (s = n, U === 0 && q(A)); s !== n;) o.push(s), s = e.charAt(z), y.test(s) ? z++ : (s = n, U === 0 && q(A));
				i = [
					i,
					a,
					o
				], r = i;
			} else z = r, r = n;
		}
		return r !== n && (B = t, r = ur()), t = r, U--, t === n && (r = n, U === 0 && q(wt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = z, r = e.charAt(z), me.test(r) ? z++ : (r = n, U === 0 && q(Tt)), r !== n) {
			if (i = e.charAt(z), _.test(i) ? z++ : (i = n, U === 0 && q(S)), i === n && (i = null), a = [], o = e.charAt(z), y.test(o) ? z++ : (o = n, U === 0 && q(A)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(z), y.test(o) ? z++ : (o = n, U === 0 && q(A));
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
		if (U++, t = z, e.charCodeAt(z) === 34 ? (r = "\"", z++) : (r = n, U === 0 && q(Et)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(z) === 34 ? (a = "\"", z++) : (a = n, U === 0 && q(Et)), a === n ? (z = t, t = n) : (B = t, t = dr(i));
		} else z = t, t = n;
		if (t === n) {
			if (t = z, e.charCodeAt(z) === 39 ? (r = "'", z++) : (r = n, U === 0 && q(Dt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(z) === 39 ? (a = "'", z++) : (a = n, U === 0 && q(Dt)), a === n ? (z = t, t = n) : (B = t, t = fr(i));
			} else z = t, t = n;
		}
		return U--, t === n && (r = n, U === 0 && q(C)), t;
	}
	function fa() {
		let t, r, i;
		return t = z, r = z, U++, i = e.charAt(z), he.test(i) ? z++ : (i = n, U === 0 && q(Ot)), U--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = pr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(gt)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 34 ? (i = "\"", z++) : (i = n, U === 0 && q(Et)), i === n ? (z = t, t = n) : (B = t, t = mr())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(gt)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = hr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = z, r = z, U++, i = e.charAt(z), ge.test(i) ? z++ : (i = n, U === 0 && q(kt)), U--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = gr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(gt)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 39 ? (i = "'", z++) : (i = n, U === 0 && q(Dt)), i === n ? (z = t, t = n) : (B = t, t = _r())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(gt)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = vr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(z), _e.test(t) ? z++ : (t = n, U === 0 && q(At)), t === n && (t = z, r = z, i = e.charAt(z), de.test(i) ? z++ : (i = n, U === 0 && q(yt)), i === n ? (z = r, r = n) : (a = e.charAt(z), fe.test(a) ? z++ : (a = n, U === 0 && q(bt)), a === n ? (z = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, z)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(gt)), r !== n && (B = t, r = yr()), t = r, t === n && (t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, U === 0 && q(mt)), r !== n && (B = t, r = br()), t = r, t === n && (t = z, e.charCodeAt(z) === 98 ? (r = "b", z++) : (r = n, U === 0 && q(jt)), r !== n && (B = t, r = xr()), t = r, t === n && (t = z, e.charCodeAt(z) === 102 ? (r = "f", z++) : (r = n, U === 0 && q(Mt)), r !== n && (B = t, r = Sr()), t = r, t === n && (t = z, e.charCodeAt(z) === 110 ? (r = "n", z++) : (r = n, U === 0 && q(Nt)), r !== n && (B = t, r = Cr()), t = r, t === n && (t = z, e.charCodeAt(z) === 114 ? (r = "r", z++) : (r = n, U === 0 && q(Pt)), r !== n && (B = t, r = wr()), t = r, t === n && (t = z, e.charCodeAt(z) === 116 ? (r = "t", z++) : (r = n, U === 0 && q(Ft)), r !== n && (B = t, r = Tr()), t = r, t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, U === 0 && q(It)), r === n ? (z = t, t = n) : (i = z, a = z, o = e.charAt(z), ve.test(o) ? z++ : (o = n, U === 0 && q(Lt)), o === n ? (z = a, a = n) : (s = e.charAt(z), ye.test(s) ? z++ : (s = n, U === 0 && q(Rt)), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (e.substr(z, 2) === "\\u" ? (a = "\\u", z += 2) : (a = n, U === 0 && q(zt)), a === n ? (z = t, t = n) : (o = z, s = z, c = e.charAt(z), ve.test(c) ? z++ : (c = n, U === 0 && q(Lt)), c === n ? (z = s, s = n) : (l = e.charAt(z), be.test(l) ? z++ : (l = n, U === 0 && q(Bt)), l === n ? (z = s, s = n) : (u = Z(), u === n ? (z = s, s = n) : (d = Z(), d === n ? (z = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, z), o === n ? (z = t, t = n) : (B = t, t = Er(i, o))))), t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, U === 0 && q(It)), r === n ? (z = t, t = n) : (i = z, a = z, o = Z(), o === n ? (z = a, a = n) : (s = Z(), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (B = z, a = R(i), a = a ? n : void 0, a === n ? (z = t, t = n) : (B = t, t = Dr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(z), b.test(t) ? z++ : (t = n, U === 0 && q(Vt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(z), oe.test(t) ? z++ : (t = n, U === 0 && q(T)), t;
	}
	function $() {
		let t, r;
		for (U++, t = [], r = e.charAt(z), xe.test(r) ? z++ : (r = n, U === 0 && q(Ht)); r !== n;) t.push(r), r = e.charAt(z), xe.test(r) ? z++ : (r = n, U === 0 && q(Ht));
		return U--, t;
	}
	function ga() {
		let t, r;
		return t = z, U++, e.length > z ? (r = e.charAt(z), z++) : (r = n, U === 0 && q(_t)), U--, r === n ? t = void 0 : (z = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && jr("Member name too long (maximum 1000 characters)"), e;
	}
	W = a();
	let va = W !== n && z === e.length;
	function ya() {
		throw W !== n && z < e.length && q(Pr()), zr(Or, H < e.length ? Mr(H) : null, H < e.length ? Lr(H, H + 1) : Lr(H, H));
	}
	if (t.peg$library) return {
		peg$result: W,
		peg$currPos: z,
		peg$FAILED: n,
		peg$maxFailExpected: Or,
		peg$maxFailPos: H,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return W;
	ya();
}
var Fe = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), Ie = {
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
}, Le = (e) => {
	throw new ye(1, 1, e);
}, Re = (e) => e.type === "root" || e.type === "current", ze = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function Be(e) {
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
		if (Re(i)) r === "value" && !ze(i) && Le("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && Le(`Expected a query, found ${String(i.type)}`), i.type) {
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
				let e = Fe.has(i.operator) ? "value" : "any";
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
				let e = i.name, n = Ie[e], a = i.args;
				a.length !== n.args.length && Le(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && Le(`The result of ${e}() must be compared`), r === "value" && n.logical && Le(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
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
			case "value": r === "test" && Le("A literal must be compared");
		}
	}
}
function Ve(e) {
	let t;
	try {
		t = Pe(e);
	} catch (e) {
		if (De(e)) throw new ye(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new ye(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new ye(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return Be(t), t;
}
var He = /* @__PURE__ */ new Set([
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
]), Ue = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), We = (e) => e >= 55296 && e <= 56319, Ge = (e) => e >= 56320 && e <= 57343, Ke = (e) => e !== void 0 && e >= "0" && e <= "9", qe = (e, t) => {
	let n = e.charCodeAt(t);
	return We(n) && Ge(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : We(n) || Ge(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, Je = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !He.has(n) ? null : n === "n" ? {
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
}, Ye = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return Ue.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, Xe = (e, t) => {
	let n = e[t];
	return n === "\\" ? Je(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : qe(e, t);
}, Ze = (e, t) => {
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
			let t = Ye(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = Xe(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = Xe(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, Qe = (e, t) => {
	let n = t + 1, r = n;
	for (; Ke(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; Ke(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, $e = (e) => {
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
				let e = i ? Qe(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = Ze(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = Ye(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = Je(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = qe(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, et = 1e3, tt = 1e3, nt = 16, rt = /^[dgimsuy]*$/, it = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, O = class extends Error {}, at = 0, ot = 1, st = 2, ct = 3, lt = 4, ut = 5, dt = ge(2, 31) - 1, ft = (e, t) => {
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
	return e.scratch = void 0, (r.gen > dt - t - 2 || r.step > dt - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, pt = /* @__PURE__ */ new Set([
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
]), mt = /^\{(\d+)(?:,(\d*))?\}/, ht = /^[0-9a-fA-F]{4}/, gt = /^\(\?([ims]*)(?:-([ims]*))?:/, _t = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, k = class {
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
		if (this.i < this.src.length) throw new O("unexpected character");
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
				let r = gt.exec(e.slice(t, t + 12));
				if (!r) throw new O("lookaround or named group");
				let i = ve({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new O("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new O("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new O("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(pt.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new O("trailing backslash");
		if (r === "b" || r === "B") throw new O("word boundary");
		if (r >= "1" && r <= "9") throw new O("backreference");
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
			if (n === -1) throw new O("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && ht.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (ht.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
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
			let n = mt.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > et || i !== Infinity && i > et) throw new O("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, vt = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= et) throw new O("pattern too large");
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
		this.emit(ut);
	}
	compile(e) {
		if (++this.work > 4 * et) throw new O("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(at, this.atomId(e));
				return;
			case "bol":
				this.emit(ct, +!!e.multiline);
				return;
			case "eol":
				this.emit(lt, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(ot);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(st)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(ot);
					this.x[t] = t + 1, this.compile(e.node), this.emit(st, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(ot);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, yt = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new k(e, r, t, n).parse(), a = new vt(r);
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
}, bt = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: te, atomHit: ne } = r, g = r.gen, re = r.step;
	r.gen = g + t.length + 2, r.step = re + t.length + 2;
	let _ = 0, v = !1, ie = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== g) switch (ee[r] = g, ++c === 64 && (u(c), c = 0), i[r]) {
				case at:
					e[n++] = r;
					break;
				case ut: return u(c), v = !0, n;
				case st:
					h[s++] = a[r];
					break;
				case ot:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case ct:
					(_ === 0 || a[r] === 1 && _t(t.charCodeAt(_ - 1))) && (h[s++] = r + 1);
					break;
				case lt: (_ === t.length || a[r] === 1 && _t(t.charCodeAt(_))) && (h[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (g++, p = ie(d, 0, 0), v) return !0;
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
			if (ne[i] === 1 && (m = ie(f, m, t + 1), v)) return !0;
		}
		if (!l && (m = ie(f, m, 0), v)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, A = (e, t, n) => {
	let r = ft(e, t.length);
	try {
		return bt(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, xt = 256, St = /* @__PURE__ */ new Map(), Ct = 0, wt = (e, t, n, r, i = !1) => {
	if (e.length > tt || t.length > 7 || !rt.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = St.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = it(s) > nt ? null : yt(n ? `^(?:${s})$` : s, t, i);
	Ct >= xt && (St.clear(), Ct = 0);
	let l = St.get(s);
	return l === void 0 && St.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), Ct++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, Tt = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), A(e, t, n);
}, Et = class {
	constructor(e) {
		this.nodes = e;
	}
}, Dt = (e) => {
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
}, Ot = (e) => {
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
	return !Dt(e);
}, kt = 256, At = /* @__PURE__ */ new Map(), jt = (e, t) => {
	let n = At.get(e);
	return n === void 0 && (n = Ot(e), At.size >= kt && At.clear(), At.set(Array.from(e).join(""), n)), t(e.length), n;
}, Mt = /* @__PURE__ */ new Map(), Nt = (e, t) => {
	let n = Mt.get(e);
	return n === void 0 && (n = $e(e), n !== null && (n = Array.from(n).join("")), Mt.size >= kt && Mt.clear(), Mt.set(Array.from(e).join(""), n)), t(e.length), n;
}, Pt = 256, Ft = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > tt) c = null;
		else if (o) {
			let n = Nt(e, i);
			c = n === null ? null : wt(n, t, r, i, !0);
		} else c = jt(e, i) ? wt(e, t, r, i) : null;
		s !== void 0 && (s.size >= Pt && s.clear(), s.set(a, c));
	}
	return c !== null && Tt(c, n, i);
}, It = {
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
		if (C(n)) return S(n);
		if (w(n)) {
			let e = Ee(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !E(r) || !E(i) ? !1 : Ft(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !E(r) || !E(i) ? !1 : Ft(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, Lt = (e, t, n = b) => e === void 0 && t === void 0 || Se(e, t, n), Rt = (e, t, n = b) => !Se(e, t, n), zt = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, Bt = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return zt(n) - zt(i);
	}
	return e.length - t.length;
}, Vt = (e, t, n = b) => T(e) && T(t) ? e < t : E(e) && E(t) ? (n(Math.min(e.length, t.length)), Bt(e, t) < 0) : !1, Ht = (e, t, n = b) => Vt(e, t, n) || Lt(e, t, n), Ut = (e, t, n = b) => T(e) && T(t) ? e > t : E(e) && E(t) ? (n(Math.min(e.length, t.length)), Bt(e, t) > 0) : !1, Wt = (e, t, n = b) => Ut(e, t, n) || Lt(e, t, n), Gt = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, Kt = (e, t, n) => {
	let r = S(e);
	for (let i = 0; i < r; i++) {
		let r = Ce(e, i);
		if (n(1 + Gt(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, qt = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, Jt = (e) => typeof e == "string" && e.length + 1 > we, Yt = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = S(e);
	for (let n = 0; n < a; n++) {
		let r = Ce(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), Jt(r) ? i.long.push(r) : i.set.add(qt(r));
	}
	return n?.set(e, i), i;
}, Xt = ({ set: e, long: t }, n, r) => {
	if (Jt(n)) {
		for (let e of t) if (r(1 + Gt(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(qt(n)));
}, Zt = (e, t, n) => {
	let r = S(e);
	for (let i = 0; i < r; i++) if (n(), x(e, i) && t(e[i])) return !0;
	return !1;
}, Qt = {
	eq: Lt,
	ne: Rt,
	lt: Vt,
	le: Ht,
	gt: Ut,
	ge: Wt,
	in: (e, t, n = b) => C(t) ? Kt(t, e, n) !== -1 : !1,
	nin: (e, t, n = b) => C(t) ? Kt(t, e, n) === -1 : !1,
	subsetof: (e, t, n = b, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = Yt(t, n, r);
		return !Zt(e, (e) => !Xt(i, e, n), n);
	},
	anyof: (e, t, n = b, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = Yt(t, n, r);
		return Zt(e, (e) => Xt(i, e, n), n);
	},
	noneof: (e, t, n = b, r) => {
		if (!C(e) || !C(t)) return !1;
		let i = Yt(t, n, r);
		return !Zt(e, (e) => Xt(i, e, n), n);
	},
	sizeof: (e, t) => !C(e) && !E(e) || !C(t) && !E(t) ? !1 : (C(e) ? S(e) : e.length) === (C(t) ? S(t) : t.length),
	size: (e, t) => !C(e) && !E(e) || !T(t) ? !1 : (C(e) ? S(e) : e.length) === t
}, $t = (e) => !C(e) && !E(e) ? !1 : (C(e) ? S(e) : e.length) === 0, en = (e, t, n, r = b, i) => !E(e) || !E(t) ? !1 : Ft(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), tn = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), nn = (e, t) => e.concat(`[${t}]`), rn = (e, t) => e < 0 ? t + e : e, an = (e, t) => {
	let n = S(e), r = rn(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: x(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, on = (e, t) => {
	for (let n of t) e.push(n);
}, sn = 1e6, cn = 100, ln = 1e6, un = 20, dn = 1e4, fn = 1e4, pn = class {
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
				else if (++e.holes > fn) {
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
}, mn = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, tn(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = tn(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = S(e);
			for (let r = 0; r < n; r++) this.tick(), x(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new pn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(dn, Math.ceil((this.retained - this.retainedLimit) / un))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new be(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(sn, cn * e.weight) + t, this.retainedLimit = Math.max(ln, un * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new pn(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(dn, Math.ceil((this.steps - this.stepLimit) / cn))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new be(`Query exceeded ${this.stepLimit} evaluation steps`);
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
						paths: nn(t, r)
					});
				}), n;
			}
			if (w(e)) {
				let n = Ee(e);
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
			let r = an(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: nn(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (C(e)) {
				let r = an(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: nn(t, r.index)
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
			i > 0 ? (a = n.start === null ? 0 : rn(n.start, r), o = n.end === null ? r : rn(n.end, r)) : (a = n.start === null ? r - 1 : rn(n.start, r), o = n.end === null ? -r - 1 : rn(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: x(e, u) ? e[u] : void 0,
				paths: nn(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (w(e.value)) {
						let t = this.handleIdentifier(e, r);
						D(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (w(e.value)) {
						let t = this.handleStringLiteral(e, r);
						D(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (C(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						D(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					on(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": on(n, this.handleBracketExpressionContent(e, r));
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
						on(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						on(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						D(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (w(e)) {
					let t = Ee(e);
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
							paths: nn(e.parent.paths, t)
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
						if (!T(i) || !T(r)) i = void 0;
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
					return T(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return $t(n);
			if (t.operator === "reg") return en(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = Qt[t.operator];
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
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new Et(r.value) : new Et(D(r?.value) ? [r?.value] : []);
			}), i = It[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
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
					if (C(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: nn(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (w(n)) {
						let i = Ee(n);
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
					if (!D(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) on(n, a);
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
				throw De(e) ? new be("Query is nested too deeply") : Oe(e) ? new be("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? sn, this.retainedLimit = this.adaptiveLimit ? ln : Infinity;
	}
}, hn = (e, t, n) => {
	let r = Ve(t), i = new mn(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? ke(i) ? [] : [i.value] : i?.value;
}, gn = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = hn(e, i, n);
		D(t) && r.push(t);
	}
	return r;
}, _n = (e, t, n = {}) => {
	try {
		return C(t) ? gn(e, t, n) : hn(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, vn = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = vn(n, t);
		if (e) return e;
	}
	return null;
}, yn = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = _n(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = vn(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
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
}, bn = (e, t, n, r) => {
	let { parent: i, key: a } = yn(e, t, r);
	return (fe[t.action] || de)(i, a, n), e;
}, xn = (e, t) => {
	if (!e) return null;
	let n = t[e.fileName];
	if (n === void 0) throw Error(`Entry not found in state: ${e.fileName}`);
	if (e.jsonPath) {
		let t = _n(n, e.jsonPath, { returnArray: !0 });
		return t.length === 0 ? Array.isArray(n) ? n : [] : t.length === 1 ? t[0] : t;
	}
	return Array.isArray(e.filePath) && e.filePath.length > 0 ? e.filePath.reduce((e, t) => e ? e[t] : void 0, n) : n;
}, Sn = (e, t, n, r = !1) => {
	if (t) {
		if (!t.filePath || t.filePath.length === 0) {
			let r = e[t.fileName];
			Array.isArray(r) ? r.push(...Array.isArray(n) ? n : [n]) : e[t.fileName] = n;
		} else try {
			bn(e, t, n, r);
		} catch {}
	}
}, Cn = {
	single: (e, t) => {
		let n = s[e.templateKey], r = xn(e.sourcePath, t);
		return (e.func === "fromCollection" ? oe : _)(r, n);
	},
	rowOnColumn: (e, { data: t }) => ce({
		columns: t?.columns,
		data: t,
		columnSpec: s[e.templateKey.columnKey],
		rowSpec: s[e.templateKey.rowKey]
	}),
	columnOnRow: (e, { data: t }) => le({
		columns: t?.columns,
		data: t,
		columnSpec: s[e.templateKey.columnKey],
		rowSpec: s[e.templateKey.rowKey]
	})
}, wn = (e, t, n = !1) => {
	let r = f[e], i = Cn[r.type](r, t);
	return Sn(t, r.destinationPath, i, n), i;
}, Tn = {
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
}, En = (e) => {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("Config must be an object");
	let { baseKey: t, instructions: n } = e;
	if (typeof t != "string" || !t.trim()) throw TypeError("baseKey must be a non-empty string");
	if (!(t in Tn)) throw Error(`baseKey "${t}" does not exist in declarative-spec`);
	if (!Array.isArray(n)) throw TypeError("instructions must be an Array");
	if (n.length === 0) throw Error("instructions cannot be empty");
	for (let e = 0; e < n.length; e++) if (typeof n[e] != "string" || !n[e].trim()) throw TypeError(`instructions[${e}] must be a non-empty string`);
	return !0;
}, Dn = {
	name: "json-renderers-run-instructions",
	version: "1.6.1"
}, On = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.steps = {
		meta: Dn,
		runInstructions: e
	});
}, kn = (e = {}) => {
	En(e);
	let { instructions: t = [], baseKey: n, data: r, showLog: i = !1 } = e, a = Tn[n];
	return t.forEach((e) => {
		i && console.log(`[runStep] ${e}`), wn(e, {
			base: a,
			data: r
		}, i);
	}), a;
};
On(kn);
// node_modules/json-write-path/src/v4/utils/toArray.js
var An = (e) => Array.isArray(e) ? e : [e], jn = (e, t, n) => {
	e[t] = n;
}, Mn = {
	set: jn,
	push: (e, t, n) => {
		e[t].push(...An(n));
	},
	unshift: (e, t, n) => {
		e[t].unshift(...An(n));
	},
	pushToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.push(...structuredClone(An(n)));
		});
	},
	unshiftToRows: (e, t, n) => {
		e[t].forEach((e) => {
			e.children.unshift(...structuredClone(An(n)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, Nn = Object.defineProperty, Pn = Object.getOwnPropertySymbols, Fn = Object.prototype.hasOwnProperty, In = Object.prototype.propertyIsEnumerable, Ln = Math.pow, Rn = (e, t, n) => t in e ? Nn(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, zn = (e, t) => {
	for (var n in t ||= {}) Fn.call(t, n) && Rn(e, n, t[n]);
	if (Pn) for (var n of Pn(t)) In.call(t, n) && Rn(e, n, t[n]);
	return e;
}, Bn = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, Vn = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, j = () => void 0, Hn = (e, t, n, r) => {
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
		let i = qn(e), a = qn(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, Un = (e, t, n = j) => {
	let r = [];
	if (!Hn(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!Hn(Wn(e.x, t), Wn(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !M(o, i) || !M(a, i)) return !1;
			let s = a[i];
			if (!M(o, i) || !Hn(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, M = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Wn = (e, t) => M(e, t) ? e[t] : void 0, Gn = 16383, Kn = 1e3, qn = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > Kn) throw new Vn(`Member name too long (maximum ${Kn} characters)`);
	return t;
}, N = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, Jn = (e) => e instanceof RangeError && /call stack/i.test(e.message), P = (e) => Array.isArray(e), Yn = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), F = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, Xn = (e) => typeof e == "number", I = (e) => typeof e == "string", Zn = (e) => e === void 0, L = (e) => e !== void 0;
function Qn(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function $n(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function er(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var tr = class extends SyntaxError {
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
function nr(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Br }, a = Br, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", ee = "size", h = "empty", te = "true", ne = "false", g = "null", re = /^[,\]]/, _ = /^[+\-]/, v = /^[*\/]/, ie = /^[a-zA-Z_]/, ae = /^[\x80-\uFFFF_]/, oe = /^[a-zA-Z0-9_]/, se = /^[0-9@$\-]/, ce = /^[^\/\\]/, le = /^[gimsuy]/, ue = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, de = /^[\uD800-\uDBFF]/, fe = /^[\uDC00-\uDFFF]/, y = /^[0-9]/, pe = /^[1-9]/, me = /^[eE]/, he = /^["\\]/, ge = /^['\\]/, _e = /^[ -\uD7FF\uE000-\uFFFF]/, ve = /^[dD]/, ye = /^[89abAB]/, be = /^[c-fC-F]/, b = /^[0-9a-fA-F]/, xe = /^[ \t\n\r]/, Se = K([",", "]"], !1, !1, !1), x = G("length", !1), Ce = G("count", !1), we = G("match", !1), Te = G("search", !1), Ee = G("value", !1), S = K(["+", "-"], !1, !1, !1), De = K(["*", "/"], !1, !1, !1), C = Fr("string"), Oe = K([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), w = K([["", "￿"], "_"], !1, !1, !1), T = K([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), E = G("-", !1), ke = K([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), D = G("$", !1), Ae = G("@", !1), je = G("..", !1), Me = G(".", !1), Ne = G("*", !1), Pe = G("&&", !1), Fe = G("||", !1), Ie = G("!", !1), Le = G("==", !1), Re = G("!=", !1), ze = G(">=", !1), Be = G(">", !1), Ve = G("<=", !1), He = G("<", !1), Ue = G("=~", !1), We = G("in", !1), Ge = G("nin", !1), Ke = G("subsetof", !1), qe = G("anyof", !1), Je = G("noneof", !1), Ye = G("sizeof", !1), Xe = G("size", !1), Ze = G("empty", !1), Qe = G("true", !1), $e = G("false", !1), et = G("null", !1), tt = G("{", !1), nt = G("}", !1), rt = G("[", !1), it = G("]", !1), O = G(":", !1), at = G(",", !1), ot = G("(", !1), st = G(")", !1), ct = G("?", !1), lt = Fr("regex"), ut = G("/", !1), dt = K(["/", "\\"], !0, !1, !1), ft = G("\\", !1), pt = Nr(), mt = K([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), ht = K([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), gt = K([["\ud800", "\udbff"]], !1, !1, !1), _t = K([["\udc00", "\udfff"]], !1, !1, !1), k = K([["0", "9"]], !1, !1, !1), vt = Fr("number"), yt = G("0", !1), bt = K([["1", "9"]], !1, !1, !1), A = Fr("integer"), xt = K(["e", "E"], !1, !1, !1), St = G("\"", !1), Ct = G("'", !1), wt = K(["\"", "\\"], !1, !1, !1), Tt = K(["'", "\\"], !1, !1, !1), Et = K([[" ", "퟿"], ["", "￿"]], !1, !1, !1), Dt = G("b", !1), Ot = G("f", !1), kt = G("n", !1), At = G("r", !1), jt = G("t", !1), Mt = G("u", !1), Nt = K(["d", "D"], !1, !1, !1), Pt = K([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Ft = G("\\u", !1), It = K([["c", "f"], ["C", "F"]], !1, !1, !1), Lt = K([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Rt = K([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function zt(e) {
		return {
			type: "root",
			next: Qn(e)
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
		return er(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function en(e, t) {
		return er(e, t, (e, t) => ({
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
		return t !== null || $n(e);
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
		return t.length === 0 ? e : er(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function Pn(e, t) {
		return t.length === 0 ? e : er(e, t, (e, t) => ({
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
			next: Qn(e)
		};
	}
	function Ln(e) {
		return {
			type: "current",
			next: Qn(e)
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
	function j(e) {
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
	function Un(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function M(e) {
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
	function qn(e) {
		return e;
	}
	function N(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Jn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function P(e, t) {
		return [e, t.value];
	}
	function Yn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function F(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function Xn(e) {
		return _a(e);
	}
	function I(e) {
		return _a(e);
	}
	function Zn() {
		return "true";
	}
	function L() {
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
		let n = parseFloat(Ar());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && jr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function ur() {
		let e = parseInt(Ar(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && jr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
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
	function Er(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function R(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Dr(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let z = t.peg$currPos | 0, B = z, V = [{
		line: 1,
		column: 1
	}], H = z, Or = t.peg$maxFailExpected || [], U = t.peg$silentFails | 0, kr = /* @__PURE__ */ new Map(), W;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function Ar() {
		return e.substring(B, z);
	}
	function jr(e, t) {
		throw t = t === void 0 ? Lr(B, z) : t, Rr(e, t);
	}
	function Mr(t = z) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function G(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function K(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Nr() {
		return { type: "any" };
	}
	function Pr() {
		return { type: "end" };
	}
	function Fr(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Ir(t) {
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
		z < H || (z > H && (H = z, Or = []), Or.push(e));
	}
	function Rr(e, t) {
		return new tr(e, null, null, t);
	}
	function zr(e, t, n) {
		return new tr(tr.buildMessage(e, t), e, t, n);
	}
	function Br() {
		let e, t, r, i;
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = Vr(), i = ga(), i === n ? (z = e, e = n) : (B = e, e = zt(r))), e;
	}
	function Vr() {
		let e, t, r, i, a;
		for (e = z, t = [], r = z, i = $(), a = Hr(), a === n ? (z = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = z, i = $(), a = Hr(), a === n ? (z = r, r = n) : (i = [i, a], r = i);
		return B = e, t = Bt(t), e = t, e;
	}
	function Hr() {
		let e;
		return e = Wr(), e === n && (e = Ur()), e;
	}
	function Ur() {
		let e, t, r;
		return e = z, t = Ti(), t === n ? (z = e, e = n) : (r = Gr(), r === n ? (z = e, e = n) : (B = e, e = Vt(r))), e === n && (e = z, t = qr(), t !== n && (B = e, t = Ht(t)), e = t), e;
	}
	function Wr() {
		let e, t, r;
		return e = z, t = wi(), t === n ? (z = e, e = n) : (r = Kr(), r === n ? (z = e, e = n) : (B = e, e = Ut(r))), e;
	}
	function Gr() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = Wt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = Gt(t)), e = t), e;
	}
	function Kr() {
		let e, t;
		return e = z, t = Ei(), t !== n && (B = e, t = Kt()), e = t, e === n && (e = z, t = xi(), t !== n && (B = e, t = qt(t)), e = t, e === n && (e = z, t = qr(), t !== n && (B = e, t = Jt(t)), e = t)), e;
	}
	function qr() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = Jr(), r === n ? (z = e, e = n) : ($(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = Yt(r)))), e;
	}
	function Jr() {
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
			B = e, e = Xt(t, r);
		} else z = e, e = n;
		return e;
	}
	function Yr() {
		let t, r, i, a, o, s, c, l, u;
		return t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = $i(), i === n ? (z = t, t = n) : ($(), a = J(), a === n ? (z = t, t = n) : ($(), o = ea(), o === n ? (z = t, t = n) : (s = z, U++, c = z, l = $(), u = e.charAt(z), re.test(u) ? z++ : (u = n, U === 0 && q(Se)), u === n ? (z = c, c = n) : (l = [l, u], c = l), U--, c === n ? s = n : (z = s, s = void 0), s === n ? (z = t, t = n) : (B = t, t = Zt(a)))))), t === n && (t = z, r = ta(), r === n ? (z = t, t = n) : ($(), i = J(), i === n ? (z = t, t = n) : (B = t, t = Qt(i)))), t;
	}
	function J() {
		let e, t, r, i, a, o, s, c, l = z * 91 + 10, u = kr.get(l);
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
			B = e, e = $t(t, r);
		} else z = e, e = n;
		return kr.set(l, {
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
			B = e, e = en(t, r);
		} else z = e, e = n;
		return e;
	}
	function Zr() {
		let e, t, r, i, a;
		return e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = $i(), r === n ? (z = e, e = n) : ($(), i = J(), i === n ? (z = e, e = n) : ($(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = tn(i))))), e === n && (e = z, t = ki(), t === n ? (z = e, e = n) : ($(), r = ti(), r === n ? (z = e, e = n) : (B = e, e = nn(r))), e === n && (e = Qr())), e;
	}
	function Qr() {
		let e, t, r, i, a;
		return e = z, t = oi(), t === n ? (z = e, e = n) : (r = z, i = $(), a = $r(), a === n ? (z = r, r = n) : (i = [i, a], r = i), r === n && (r = null), B = z, i = rn(t, r), i = i ? void 0 : n, i === n ? (z = e, e = n) : (B = e, e = an(t, r))), e === n && (e = ti()), e;
	}
	function $r() {
		let e, t, r;
		return e = z, t = ei(), t === n ? (z = e, e = n) : ($(), r = oi(), r === n ? (z = e, e = n) : (B = e, e = on(t, r))), e === n && (e = z, t = Ii(), t === n ? (z = e, e = n) : ($(), r = fi(), r === n ? (z = e, e = n) : (B = e, e = sn(r))), e === n && (e = z, t = Wi(), t !== n && (B = e, t = cn()), e = t)), e;
	}
	function ei() {
		let e, t;
		return e = z, t = Ai(), t !== n && (B = e, t = ln()), e = t, e === n && (e = z, t = ji(), t !== n && (B = e, t = un()), e = t, e === n && (e = z, t = Pi(), t !== n && (B = e, t = dn()), e = t, e === n && (e = z, t = Fi(), t !== n && (B = e, t = fn()), e = t, e === n && (e = z, t = Mi(), t !== n && (B = e, t = pn()), e = t, e === n && (e = z, t = Ni(), t !== n && (B = e, t = mn()), e = t, e === n && (e = z, t = Li(), t !== n && (B = e, t = hn()), e = t, e === n && (e = z, t = Ri(), t !== n && (B = e, t = gn()), e = t, e === n && (e = z, t = zi(), t !== n && (B = e, t = _n()), e = t, e === n && (e = z, t = Bi(), t !== n && (B = e, t = vn()), e = t, e === n && (e = z, t = Vi(), t !== n && (B = e, t = yn()), e = t, e === n && (e = z, t = Hi(), t !== n && (B = e, t = bn()), e = t, e === n && (e = z, t = Ui(), t !== n && (B = e, t = xn()), e = t)))))))))))), e;
	}
	function ti() {
		let e, t, r, i;
		return e = z, t = $i(), t === n ? (z = e, e = n) : ($(), r = J(), r === n ? (z = e, e = n) : ($(), i = ea(), i === n ? (z = e, e = n) : (B = e, e = Sn(r)))), e === n && (e = ni(), e === n && (e = li(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = Cn()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = wn()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = Tn()), e = t))))), e;
	}
	function ni() {
		let e, t, r, i, a;
		return e = z, t = ri(), t === n ? (z = e, e = n) : (r = $i(), r === n ? (z = e, e = n) : ($(), i = ii(), i === n && (i = null), $(), a = ea(), a === n ? (z = e, e = n) : (B = e, e = En(t, i)))), e;
	}
	function ri() {
		let t, r;
		return t = z, e.substr(z, 6) === o ? (r = o, z += 6) : (r = n, U === 0 && q(x)), r !== n && (B = t, r = Dn()), t = r, t === n && (t = z, e.substr(z, 5) === s ? (r = s, z += 5) : (r = n, U === 0 && q(Ce)), r !== n && (B = t, r = On()), t = r, t === n && (t = z, e.substr(z, 5) === c ? (r = c, z += 5) : (r = n, U === 0 && q(we)), r !== n && (B = t, r = kn()), t = r, t === n && (t = z, e.substr(z, 6) === l ? (r = l, z += 6) : (r = n, U === 0 && q(Te)), r !== n && (B = t, r = An()), t = r, t === n && (t = z, e.substr(z, 5) === u ? (r = u, z += 5) : (r = n, U === 0 && q(Ee)), r !== n && (B = t, r = jn()), t = r)))), t;
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
		let t, r, i, a, o, s, c, l, u = z * 91 + 21, d = kr.get(u);
		if (d) return z = d.nextPos, d.result;
		if (t = z, r = si(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), _.test(s) ? z++ : (s = n, U === 0 && q(S)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), _.test(s) ? z++ : (s = n, U === 0 && q(S)), s === n ? (z = a, a = n) : (c = $(), l = si(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			B = t, t = Nn(r, i);
		} else z = t, t = n;
		return kr.set(u, {
			nextPos: z,
			result: t
		}), t;
	}
	function si() {
		let t, r, i, a, o, s, c, l;
		if (t = z, r = ci(), r !== n) {
			for (i = [], a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, U === 0 && q(De)), s === n ? (z = a, a = n) : (c = $(), l = ci(), l === n ? (z = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = z, o = $(), s = e.charAt(z), v.test(s) ? z++ : (s = n, U === 0 && q(De)), s === n ? (z = a, a = n) : (c = $(), l = ci(), l === n ? (z = a, a = n) : (o = [
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
		return e = z, t = Si(), t === n ? (z = e, e = n) : (r = Vr(), r === n ? (z = e, e = n) : (B = e, e = In(r))), e === n && (e = z, t = Ci(), t === n ? (z = e, e = n) : (r = Vr(), r === n ? (z = e, e = n) : (B = e, e = Ln(r)))), e;
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
		return e = Yr(), e === n && (e = ui(), e === n && (e = z, t = Ei(), t !== n && (B = e, t = zn()), e = t, e === n && (e = z, t = la(), t !== n && (B = e, t = Bn(t)), e = t, e === n && (e = z, t = da(), t !== n && (B = e, t = Vn(t)), e = t, e === n && (e = z, t = yi(), t !== n && (B = e, t = j(t)), e = t))))), e;
	}
	function fi() {
		let e, t, r;
		return e = z, t = na(), t === n ? (z = e, e = n) : (r = ra(), B = e, e = Hn(t, r)), e;
	}
	function Y() {
		let e, t;
		return e = z, t = pi(), t !== n && (B = e, t = Un(t)), e = t, e === n && (e = z, t = sa(), t !== n && (B = e, t = M(t)), e = t, e === n && (e = mi(), e === n && (e = _i(), e === n && (e = z, t = Gi(), t !== n && (B = e, t = Wn()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = Gn()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = Kn()), e = t)))))), e;
	}
	function pi() {
		let e, t;
		return U++, e = z, t = da(), t !== n && (B = e, t = qn(t)), e = t, U--, e === n && (t = n, U === 0 && q(C)), e;
	}
	function mi() {
		let e, t, r, i;
		return e = z, t = Ji(), t === n ? (z = e, e = n) : ($(), r = hi(), r === n && (r = null), $(), i = Yi(), i === n ? (z = e, e = n) : (B = e, e = N(r))), e;
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
			B = e, e = Jn(t, r);
		} else z = e, e = n;
		return e;
	}
	function gi() {
		let e, t, r, i;
		return e = z, t = da(), t === n ? (z = e, e = n) : ($(), r = Qi(), r === n ? (z = e, e = n) : ($(), i = Y(), i === n ? (z = e, e = n) : (B = e, e = P(t, i)))), e;
	}
	function _i() {
		let e, t, r, i;
		return e = z, t = Xi(), t === n ? (z = e, e = n) : ($(), r = vi(), r === n && (r = null), $(), i = Zi(), i === n ? (z = e, e = n) : (B = e, e = Yn(r))), e;
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
			B = e, e = F(t, r);
		} else z = e, e = n;
		return e;
	}
	function yi() {
		let t, r, i, a, o, s;
		if (t = z, r = z, i = z, a = e.charAt(z), ie.test(a) ? z++ : (a = n, U === 0 && q(Oe)), a !== n) {
			for (o = [], s = bi(); s !== n;) o.push(s), s = bi();
			a = [a, o], i = a;
		} else z = i, i = n;
		if (r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = Xn(r)), t = r, t === n) {
			if (t = z, r = z, i = [], a = e.charAt(z), ae.test(a) ? z++ : (a = n, U === 0 && q(w)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(z), ae.test(a) ? z++ : (a = n, U === 0 && q(w));
			else i = n;
			r = i === n ? i : e.substring(r, z), r !== n && (B = t, r = I(r)), t = r, t === n && (t = z, r = Gi(), r !== n && (B = t, r = Zn()), t = r, t === n && (t = z, r = Ki(), r !== n && (B = t, r = L()), t = r, t === n && (t = z, r = qi(), r !== n && (B = t, r = nr()), t = r)));
		}
		return t;
	}
	function bi() {
		let t, r, i, a;
		return t = e.charAt(z), oe.test(t) ? z++ : (t = n, U === 0 && q(T)), t === n && (t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, U === 0 && q(E)), r === n ? (z = t, t = n) : (i = z, U++, a = e.charAt(z), se.test(a) ? z++ : (a = n, U === 0 && q(ke)), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function xi() {
		let e, t;
		return e = z, t = ia(), t !== n && (B = e, t = rr(t)), e = t, e === n && (e = z, t = Gi(), t !== n && (B = e, t = ir()), e = t, e === n && (e = z, t = Ki(), t !== n && (B = e, t = ar()), e = t, e === n && (e = z, t = qi(), t !== n && (B = e, t = or()), e = t))), e;
	}
	function Si() {
		let t;
		return e.charCodeAt(z) === 36 ? (t = "$", z++) : (t = n, U === 0 && q(D)), t;
	}
	function Ci() {
		let t;
		return e.charCodeAt(z) === 64 ? (t = "@", z++) : (t = n, U === 0 && q(Ae)), t;
	}
	function wi() {
		let t;
		return e.substr(z, 2) === ".." ? (t = "..", z += 2) : (t = n, U === 0 && q(je)), t;
	}
	function Ti() {
		let t;
		return e.charCodeAt(z) === 46 ? (t = ".", z++) : (t = n, U === 0 && q(Me)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(z) === 42 ? (t = "*", z++) : (t = n, U === 0 && q(Ne)), t;
	}
	function Di() {
		let t;
		return e.substr(z, 2) === "&&" ? (t = "&&", z += 2) : (t = n, U === 0 && q(Pe)), t;
	}
	function Oi() {
		let t;
		return e.substr(z, 2) === "||" ? (t = "||", z += 2) : (t = n, U === 0 && q(Fe)), t;
	}
	function ki() {
		let t;
		return e.charCodeAt(z) === 33 ? (t = "!", z++) : (t = n, U === 0 && q(Ie)), t;
	}
	function Ai() {
		let t;
		return e.substr(z, 2) === "==" ? (t = "==", z += 2) : (t = n, U === 0 && q(Le)), t;
	}
	function ji() {
		let t;
		return e.substr(z, 2) === "!=" ? (t = "!=", z += 2) : (t = n, U === 0 && q(Re)), t;
	}
	function Mi() {
		let t;
		return e.substr(z, 2) === ">=" ? (t = ">=", z += 2) : (t = n, U === 0 && q(ze)), t;
	}
	function Ni() {
		let t;
		return e.charCodeAt(z) === 62 ? (t = ">", z++) : (t = n, U === 0 && q(Be)), t;
	}
	function Pi() {
		let t;
		return e.substr(z, 2) === "<=" ? (t = "<=", z += 2) : (t = n, U === 0 && q(Ve)), t;
	}
	function Fi() {
		let t;
		return e.charCodeAt(z) === 60 ? (t = "<", z++) : (t = n, U === 0 && q(He)), t;
	}
	function Ii() {
		let t;
		return e.substr(z, 2) === "=~" ? (t = "=~", z += 2) : (t = n, U === 0 && q(Ue)), t;
	}
	function Li() {
		let t, r, i, a;
		return t = z, e.substr(z, 2) === "in" ? (r = "in", z += 2) : (r = n, U === 0 && q(We)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = z, e.substr(z, 3) === "nin" ? (r = "nin", z += 3) : (r = n, U === 0 && q(Ge)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = z, e.substr(z, 8) === d ? (r = d, z += 8) : (r = n, U === 0 && q(Ke)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === f ? (r = f, z += 5) : (r = n, U === 0 && q(qe)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === p ? (r = p, z += 6) : (r = n, U === 0 && q(Je)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = z, e.substr(z, 6) === m ? (r = m, z += 6) : (r = n, U === 0 && q(Ye)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === ee ? (r = ee, z += 4) : (r = n, U === 0 && q(Xe)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === h ? (r = h, z += 5) : (r = n, U === 0 && q(Ze)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === te ? (r = te, z += 4) : (r = n, U === 0 && q(Qe)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = z, e.substr(z, 5) === ne ? (r = ne, z += 5) : (r = n, U === 0 && q($e)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = z, e.substr(z, 4) === g ? (r = g, z += 4) : (r = n, U === 0 && q(et)), r === n ? (z = t, t = n) : (i = z, U++, a = Q(), U--, a === n ? i = void 0 : (z = i, i = n), i === n ? (z = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(z) === 123 ? (t = "{", z++) : (t = n, U === 0 && q(tt)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(z) === 125 ? (t = "}", z++) : (t = n, U === 0 && q(nt)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(z) === 91 ? (t = "[", z++) : (t = n, U === 0 && q(rt)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(z) === 93 ? (t = "]", z++) : (t = n, U === 0 && q(it)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(z) === 58 ? (t = ":", z++) : (t = n, U === 0 && q(O)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(z) === 44 ? (t = ",", z++) : (t = n, U === 0 && q(at)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(z) === 40 ? (t = "(", z++) : (t = n, U === 0 && q(ot)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(z) === 41 ? (t = ")", z++) : (t = n, U === 0 && q(st)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(z) === 63 ? (t = "?", z++) : (t = n, U === 0 && q(ct)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (U++, t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, U === 0 && q(ut)), r !== n) {
			for (i = [], a = e.charAt(z), ce.test(a) ? z++ : (a = n, U === 0 && q(dt)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, U === 0 && q(ft)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, U === 0 && q(pt)), s === n ? (z = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(z), ce.test(a) ? z++ : (a = n, U === 0 && q(dt)), a === n && (a = z, e.charCodeAt(z) === 92 ? (o = "\\", z++) : (o = n, U === 0 && q(ft)), o === n ? (z = a, a = n) : (e.length > z ? (s = e.charAt(z), z++) : (s = n, U === 0 && q(pt)), s === n ? (z = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(z) === 47 ? (a = "/", z++) : (a = n, U === 0 && q(ut)), a === n ? (z = t, t = n) : (B = t, t = sr(i));
		} else z = t, t = n;
		return U--, t === n && (r = n, U === 0 && q(lt)), t;
	}
	function ra() {
		let t, r, i;
		for (t = z, r = [], i = e.charAt(z), le.test(i) ? z++ : (i = n, U === 0 && q(mt)); i !== n;) r.push(i), i = e.charAt(z), le.test(i) ? z++ : (i = n, U === 0 && q(mt));
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
		return t = e.charAt(z), ue.test(t) ? z++ : (t = n, U === 0 && q(ht)), t === n && (t = z, r = e.charAt(z), de.test(r) ? z++ : (r = n, U === 0 && q(gt)), r === n ? (z = t, t = n) : (i = e.charAt(z), fe.test(i) ? z++ : (i = n, U === 0 && q(_t)), i === n ? (z = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(z), y.test(t) ? z++ : (t = n, U === 0 && q(k))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (U++, t = z, e.charCodeAt(z) === 45 ? (r = "-", z++) : (r = n, U === 0 && q(E)), r === n && (r = null), i = ca(), i !== n) {
			if (a = z, e.charCodeAt(z) === 46 ? (o = ".", z++) : (o = n, U === 0 && q(Me)), o !== n) {
				if (s = [], c = e.charAt(z), y.test(c) ? z++ : (c = n, U === 0 && q(k)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(z), y.test(c) ? z++ : (c = n, U === 0 && q(k));
				else s = n;
				s === n ? (z = a, a = n) : (o = [o, s], a = o);
			} else z = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), B = t, t = lr(a, o);
		} else z = t, t = n;
		return U--, t === n && (r = n, U === 0 && q(vt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(z) === 48 ? (t = "0", z++) : (t = n, U === 0 && q(yt)), t === n) {
			if (t = z, r = e.charAt(z), pe.test(r) ? z++ : (r = n, U === 0 && q(bt)), r !== n) {
				for (i = [], a = e.charAt(z), y.test(a) ? z++ : (a = n, U === 0 && q(k)); a !== n;) i.push(a), a = e.charAt(z), y.test(a) ? z++ : (a = n, U === 0 && q(k));
				r = [r, i], t = r;
			} else z = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (U++, t = z, e.charCodeAt(z) === 48 ? (r = "0", z++) : (r = n, U === 0 && q(yt)), r === n) {
			if (r = z, e.charCodeAt(z) === 45 ? (i = "-", z++) : (i = n, U === 0 && q(E)), i === n && (i = null), a = e.charAt(z), pe.test(a) ? z++ : (a = n, U === 0 && q(bt)), a !== n) {
				for (o = [], s = e.charAt(z), y.test(s) ? z++ : (s = n, U === 0 && q(k)); s !== n;) o.push(s), s = e.charAt(z), y.test(s) ? z++ : (s = n, U === 0 && q(k));
				i = [
					i,
					a,
					o
				], r = i;
			} else z = r, r = n;
		}
		return r !== n && (B = t, r = ur()), t = r, U--, t === n && (r = n, U === 0 && q(A)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = z, r = e.charAt(z), me.test(r) ? z++ : (r = n, U === 0 && q(xt)), r !== n) {
			if (i = e.charAt(z), _.test(i) ? z++ : (i = n, U === 0 && q(S)), i === n && (i = null), a = [], o = e.charAt(z), y.test(o) ? z++ : (o = n, U === 0 && q(k)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(z), y.test(o) ? z++ : (o = n, U === 0 && q(k));
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
		if (U++, t = z, e.charCodeAt(z) === 34 ? (r = "\"", z++) : (r = n, U === 0 && q(St)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(z) === 34 ? (a = "\"", z++) : (a = n, U === 0 && q(St)), a === n ? (z = t, t = n) : (B = t, t = dr(i));
		} else z = t, t = n;
		if (t === n) {
			if (t = z, e.charCodeAt(z) === 39 ? (r = "'", z++) : (r = n, U === 0 && q(Ct)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(z) === 39 ? (a = "'", z++) : (a = n, U === 0 && q(Ct)), a === n ? (z = t, t = n) : (B = t, t = fr(i));
			} else z = t, t = n;
		}
		return U--, t === n && (r = n, U === 0 && q(C)), t;
	}
	function fa() {
		let t, r, i;
		return t = z, r = z, U++, i = e.charAt(z), he.test(i) ? z++ : (i = n, U === 0 && q(wt)), U--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = pr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(ft)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 34 ? (i = "\"", z++) : (i = n, U === 0 && q(St)), i === n ? (z = t, t = n) : (B = t, t = mr())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(ft)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = hr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = z, r = z, U++, i = e.charAt(z), ge.test(i) ? z++ : (i = n, U === 0 && q(Tt)), U--, i === n ? r = void 0 : (z = r, r = n), r === n ? (z = t, t = n) : (i = ma(), i === n ? (z = t, t = n) : (B = t, t = gr(i))), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(ft)), r === n ? (z = t, t = n) : (e.charCodeAt(z) === 39 ? (i = "'", z++) : (i = n, U === 0 && q(Ct)), i === n ? (z = t, t = n) : (B = t, t = _r())), t === n && (t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(ft)), r === n ? (z = t, t = n) : (i = ha(), i === n ? (z = t, t = n) : (B = t, t = vr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(z), _e.test(t) ? z++ : (t = n, U === 0 && q(Et)), t === n && (t = z, r = z, i = e.charAt(z), de.test(i) ? z++ : (i = n, U === 0 && q(gt)), i === n ? (z = r, r = n) : (a = e.charAt(z), fe.test(a) ? z++ : (a = n, U === 0 && q(_t)), a === n ? (z = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, z)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = z, e.charCodeAt(z) === 92 ? (r = "\\", z++) : (r = n, U === 0 && q(ft)), r !== n && (B = t, r = yr()), t = r, t === n && (t = z, e.charCodeAt(z) === 47 ? (r = "/", z++) : (r = n, U === 0 && q(ut)), r !== n && (B = t, r = br()), t = r, t === n && (t = z, e.charCodeAt(z) === 98 ? (r = "b", z++) : (r = n, U === 0 && q(Dt)), r !== n && (B = t, r = xr()), t = r, t === n && (t = z, e.charCodeAt(z) === 102 ? (r = "f", z++) : (r = n, U === 0 && q(Ot)), r !== n && (B = t, r = Sr()), t = r, t === n && (t = z, e.charCodeAt(z) === 110 ? (r = "n", z++) : (r = n, U === 0 && q(kt)), r !== n && (B = t, r = Cr()), t = r, t === n && (t = z, e.charCodeAt(z) === 114 ? (r = "r", z++) : (r = n, U === 0 && q(At)), r !== n && (B = t, r = wr()), t = r, t === n && (t = z, e.charCodeAt(z) === 116 ? (r = "t", z++) : (r = n, U === 0 && q(jt)), r !== n && (B = t, r = Tr()), t = r, t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, U === 0 && q(Mt)), r === n ? (z = t, t = n) : (i = z, a = z, o = e.charAt(z), ve.test(o) ? z++ : (o = n, U === 0 && q(Nt)), o === n ? (z = a, a = n) : (s = e.charAt(z), ye.test(s) ? z++ : (s = n, U === 0 && q(Pt)), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (e.substr(z, 2) === "\\u" ? (a = "\\u", z += 2) : (a = n, U === 0 && q(Ft)), a === n ? (z = t, t = n) : (o = z, s = z, c = e.charAt(z), ve.test(c) ? z++ : (c = n, U === 0 && q(Nt)), c === n ? (z = s, s = n) : (l = e.charAt(z), be.test(l) ? z++ : (l = n, U === 0 && q(It)), l === n ? (z = s, s = n) : (u = Z(), u === n ? (z = s, s = n) : (d = Z(), d === n ? (z = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, z), o === n ? (z = t, t = n) : (B = t, t = Er(i, o))))), t === n && (t = z, e.charCodeAt(z) === 117 ? (r = "u", z++) : (r = n, U === 0 && q(Mt)), r === n ? (z = t, t = n) : (i = z, a = z, o = Z(), o === n ? (z = a, a = n) : (s = Z(), s === n ? (z = a, a = n) : (c = Z(), c === n ? (z = a, a = n) : (l = Z(), l === n ? (z = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, z), i === n ? (z = t, t = n) : (B = z, a = R(i), a = a ? n : void 0, a === n ? (z = t, t = n) : (B = t, t = Dr(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(z), b.test(t) ? z++ : (t = n, U === 0 && q(Lt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(z), oe.test(t) ? z++ : (t = n, U === 0 && q(T)), t;
	}
	function $() {
		let t, r;
		for (U++, t = [], r = e.charAt(z), xe.test(r) ? z++ : (r = n, U === 0 && q(Rt)); r !== n;) t.push(r), r = e.charAt(z), xe.test(r) ? z++ : (r = n, U === 0 && q(Rt));
		return U--, t;
	}
	function ga() {
		let t, r;
		return t = z, U++, e.length > z ? (r = e.charAt(z), z++) : (r = n, U === 0 && q(pt)), U--, r === n ? t = void 0 : (z = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && jr("Member name too long (maximum 1000 characters)"), e;
	}
	W = a();
	let va = W !== n && z === e.length;
	function ya() {
		throw W !== n && z < e.length && q(Pr()), zr(Or, H < e.length ? Mr(H) : null, H < e.length ? Lr(H, H + 1) : Lr(H, H));
	}
	if (t.peg$library) return {
		peg$result: W,
		peg$currPos: z,
		peg$FAILED: n,
		peg$maxFailExpected: Or,
		peg$maxFailPos: H,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return W;
	ya();
}
var rr = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), ir = {
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
}, ar = (e) => {
	throw new Bn(1, 1, e);
}, or = (e) => e.type === "root" || e.type === "current", sr = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function cr(e) {
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
		if (or(i)) r === "value" && !sr(i) && ar("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && ar(`Expected a query, found ${String(i.type)}`), i.type) {
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
				let e = rr.has(i.operator) ? "value" : "any";
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
				let e = i.name, n = ir[e], a = i.args;
				a.length !== n.args.length && ar(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && ar(`The result of ${e}() must be compared`), r === "value" && n.logical && ar(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
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
			case "value": r === "test" && ar("A literal must be compared");
		}
	}
}
function lr(e) {
	let t;
	try {
		t = nr(e);
	} catch (e) {
		if (Jn(e)) throw new Bn(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new Bn(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new Bn(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return cr(t), t;
}
var ur = /* @__PURE__ */ new Set([
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
]), dr = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), fr = (e) => e >= 55296 && e <= 56319, pr = (e) => e >= 56320 && e <= 57343, mr = (e) => e !== void 0 && e >= "0" && e <= "9", hr = (e, t) => {
	let n = e.charCodeAt(t);
	return fr(n) && pr(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : fr(n) || pr(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, gr = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !ur.has(n) ? null : n === "n" ? {
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
}, _r = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return dr.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, vr = (e, t) => {
	let n = e[t];
	return n === "\\" ? gr(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : hr(e, t);
}, yr = (e, t) => {
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
			let t = _r(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = vr(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = vr(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, br = (e, t) => {
	let n = t + 1, r = n;
	for (; mr(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; mr(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, xr = (e) => {
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
				let e = i ? br(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = yr(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = _r(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = gr(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = hr(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, Sr = 1e3, Cr = 1e3, wr = 16, Tr = /^[dgimsuy]*$/, Er = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, R = class extends Error {}, Dr = 0, z = 1, B = 2, V = 3, H = 4, Or = 5, U = Ln(2, 31) - 1, kr = (e, t) => {
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
}, W = /* @__PURE__ */ new Set([
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
]), Ar = /^\{(\d+)(?:,(\d*))?\}/, jr = /^[0-9a-fA-F]{4}/, Mr = /^\(\?([ims]*)(?:-([ims]*))?:/, G = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, K = class {
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
				let r = Mr.exec(e.slice(t, t + 12));
				if (!r) throw new R("lookaround or named group");
				let i = zn({}, n);
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
		return this.i = t + i.length, this.atom(W.has(i) ? `\\${i}` : i, i);
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
		if (r === "u" && jr.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (jr.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
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
			let n = Ar.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > Sr || i !== Infinity && i > Sr) throw new R("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, Nr = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= Sr) throw new R("pattern too large");
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
		this.emit(Or);
	}
	compile(e) {
		if (++this.work > 4 * Sr) throw new R("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(Dr, this.atomId(e));
				return;
			case "bol":
				this.emit(V, +!!e.multiline);
				return;
			case "eol":
				this.emit(H, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(z);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(B)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(z);
					this.x[t] = t + 1, this.compile(e.node), this.emit(B, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(z);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Pr = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new K(e, r, t, n).parse(), a = new Nr(r);
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
}, Fr = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: ee, stack: h, atomGen: te, atomHit: ne } = r, g = r.gen, re = r.step;
	r.gen = g + t.length + 2, r.step = re + t.length + 2;
	let _ = 0, v = !1, ie = (e, n, r) => {
		let s = 0;
		h[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = h[--s];
			if (ee[r] !== g) switch (ee[r] = g, ++c === 64 && (u(c), c = 0), i[r]) {
				case Dr:
					e[n++] = r;
					break;
				case Or: return u(c), v = !0, n;
				case B:
					h[s++] = a[r];
					break;
				case z:
					h[s++] = o[r], h[s++] = a[r];
					break;
				case V:
					(_ === 0 || a[r] === 1 && G(t.charCodeAt(_ - 1))) && (h[s++] = r + 1);
					break;
				case H: (_ === t.length || a[r] === 1 && G(t.charCodeAt(_))) && (h[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (g++, p = ie(d, 0, 0), v) return !0;
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
			if (ne[i] === 1 && (m = ie(f, m, t + 1), v)) return !0;
		}
		if (!l && (m = ie(f, m, 0), v)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, Ir = (e, t, n) => {
	let r = kr(e, t.length);
	try {
		return Fr(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Lr = 256, q = /* @__PURE__ */ new Map(), Rr = 0, zr = (e, t, n, r, i = !1) => {
	if (e.length > Cr || t.length > 7 || !Tr.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = q.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Er(s) > wr ? null : Pr(n ? `^(?:${s})$` : s, t, i);
	Rr >= Lr && (q.clear(), Rr = 0);
	let l = q.get(s);
	return l === void 0 && q.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), Rr++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, Br = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Ir(e, t, n);
}, Vr = class {
	constructor(e) {
		this.nodes = e;
	}
}, Hr = (e) => {
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
}, Ur = (e) => {
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
	return !Hr(e);
}, Wr = 256, Gr = /* @__PURE__ */ new Map(), Kr = (e, t) => {
	let n = Gr.get(e);
	return n === void 0 && (n = Ur(e), Gr.size >= Wr && Gr.clear(), Gr.set(Array.from(e).join(""), n)), t(e.length), n;
}, qr = /* @__PURE__ */ new Map(), Jr = (e, t) => {
	let n = qr.get(e);
	return n === void 0 && (n = xr(e), n !== null && (n = Array.from(n).join("")), qr.size >= Wr && qr.clear(), qr.set(Array.from(e).join(""), n)), t(e.length), n;
}, Yr = 256, J = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > Cr) c = null;
		else if (o) {
			let n = Jr(e, i);
			c = n === null ? null : zr(n, t, r, i, !0);
		} else c = Kr(e, i) ? zr(e, t, r, i) : null;
		s !== void 0 && (s.size >= Yr && s.clear(), s.set(a, c));
	}
	return c !== null && Br(c, n, i);
}, Xr = {
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
			let e = qn(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !I(r) || !I(i) ? !1 : J(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !I(r) || !I(i) ? !1 : J(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, Zr = (e, t, n = j) => e === void 0 && t === void 0 || Un(e, t, n), Qr = (e, t, n = j) => !Un(e, t, n), $r = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, ei = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return $r(n) - $r(i);
	}
	return e.length - t.length;
}, ti = (e, t, n = j) => Xn(e) && Xn(t) ? e < t : I(e) && I(t) ? (n(Math.min(e.length, t.length)), ei(e, t) < 0) : !1, ni = (e, t, n = j) => ti(e, t, n) || Zr(e, t, n), ri = (e, t, n = j) => Xn(e) && Xn(t) ? e > t : I(e) && I(t) ? (n(Math.min(e.length, t.length)), ei(e, t) > 0) : !1, ii = (e, t, n = j) => ri(e, t, n) || Zr(e, t, n), ai = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, oi = (e, t, n) => {
	let r = N(e);
	for (let i = 0; i < r; i++) {
		let r = Wn(e, i);
		if (n(1 + ai(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, si = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, ci = (e) => typeof e == "string" && e.length + 1 > Gn, li = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = N(e);
	for (let n = 0; n < a; n++) {
		let r = Wn(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), ci(r) ? i.long.push(r) : i.set.add(si(r));
	}
	return n?.set(e, i), i;
}, ui = ({ set: e, long: t }, n, r) => {
	if (ci(n)) {
		for (let e of t) if (r(1 + ai(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(si(n)));
}, di = (e, t, n) => {
	let r = N(e);
	for (let i = 0; i < r; i++) if (n(), M(e, i) && t(e[i])) return !0;
	return !1;
}, fi = {
	eq: Zr,
	ne: Qr,
	lt: ti,
	le: ni,
	gt: ri,
	ge: ii,
	in: (e, t, n = j) => P(t) ? oi(t, e, n) !== -1 : !1,
	nin: (e, t, n = j) => P(t) ? oi(t, e, n) === -1 : !1,
	subsetof: (e, t, n = j, r) => {
		if (!P(e) || !P(t)) return !1;
		let i = li(t, n, r);
		return !di(e, (e) => !ui(i, e, n), n);
	},
	anyof: (e, t, n = j, r) => {
		if (!P(e) || !P(t)) return !1;
		let i = li(t, n, r);
		return di(e, (e) => ui(i, e, n), n);
	},
	noneof: (e, t, n = j, r) => {
		if (!P(e) || !P(t)) return !1;
		let i = li(t, n, r);
		return !di(e, (e) => ui(i, e, n), n);
	},
	sizeof: (e, t) => !P(e) && !I(e) || !P(t) && !I(t) ? !1 : (P(e) ? N(e) : e.length) === (P(t) ? N(t) : t.length),
	size: (e, t) => !P(e) && !I(e) || !Xn(t) ? !1 : (P(e) ? N(e) : e.length) === t
}, Y = (e) => !P(e) && !I(e) ? !1 : (P(e) ? N(e) : e.length) === 0, pi = (e, t, n, r = j, i) => !I(e) || !I(t) ? !1 : J(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), mi = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), hi = (e, t) => e.concat(`[${t}]`), gi = (e, t) => e < 0 ? t + e : e, _i = (e, t) => {
	let n = N(e), r = gi(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: M(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, vi = (e, t) => {
	for (let n of t) e.push(n);
}, yi = 1e6, bi = 100, xi = 1e6, Si = 20, Ci = 1e4, wi = 1e4, Ti = class {
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
				else if (++e.holes > wi) {
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
}, Ei = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, mi(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = mi(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = N(e);
			for (let r = 0; r < n; r++) this.tick(), M(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Ti(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Ci, Math.ceil((this.retained - this.retainedLimit) / Si))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new Vn(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(yi, bi * e.weight) + t, this.retainedLimit = Math.max(xi, Si * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Ti(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(Ci, Math.ceil((this.steps - this.stepLimit) / bi))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new Vn(`Query exceeded ${this.stepLimit} evaluation steps`);
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
						paths: hi(t, r)
					});
				}), n;
			}
			if (F(e)) {
				let n = qn(e);
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
			let r = _i(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: hi(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (P(e)) {
				let r = _i(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: hi(t, r.index)
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
			i > 0 ? (a = n.start === null ? 0 : gi(n.start, r), o = n.end === null ? r : gi(n.end, r)) : (a = n.start === null ? r - 1 : gi(n.start, r), o = n.end === null ? -r - 1 : gi(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: M(e, u) ? e[u] : void 0,
				paths: hi(t, u)
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
					vi(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": vi(n, this.handleBracketExpressionContent(e, r));
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
						vi(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						vi(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						L(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (F(e)) {
					let t = qn(e);
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
							paths: hi(e.parent.paths, t)
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
						if (!Xn(i) || !Xn(r)) i = void 0;
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
					return Xn(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return Y(n);
			if (t.operator === "reg") return pi(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = fi[t.operator];
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
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new Vr(r.value) : new Vr(L(r?.value) ? [r?.value] : []);
			}), i = Xr[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
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
							paths: hi(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (F(n)) {
						let i = qn(n);
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
				if (o === null) vi(n, a);
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
				throw Jn(e) ? new Vn("Query is nested too deeply") : Yn(e) ? new Vn("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? yi, this.retainedLimit = this.adaptiveLimit ? xi : Infinity;
	}
}, Di = (e, t, n) => {
	let r = lr(t), i = new Ei(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? Zn(i) ? [] : [i.value] : i?.value;
}, Oi = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Di(e, i, n);
		L(t) && r.push(t);
	}
	return r;
}, ki = (e, t, n = {}) => {
	try {
		return P(t) ? Oi(e, t, n) : Di(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Ai = (e) => typeof e == "object" && !!e && !Array.isArray(e), ji = (e, t) => {
	if (!Ai(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = Ri(t, i);
	return n;
}, Mi = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => Ri(t, e));
}, Ni = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, Pi = (e, t) => Ni(e, t), Fi = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Ii = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Li = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Ii,
		applyTemplate: e
	});
}, Ri = (e, t, n) => {
	let r = e, i = t;
	Fi(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Ni(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = Pi(a?.textContent, r)), "attributes" in a && (a.attributes = ji(a?.attributes, r)), "children" in a && (a.children = Mi(a?.children, r))), a);
};
Li(Ri);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var zi = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Bi = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
};
((e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Bi,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
})((e, t) => {
	let n = e;
	return zi(n, t), n.map((e) => Ri(e, e[t]));
}, (e, t) => {
	let n = e, r = t;
	return zi(n, r), n.map((e) => Ri(e, r));
});
// node_modules/json-transformer-funcs/src/v24/findByRole.js
var Vi = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = Vi(n, t);
		if (e) return e;
	}
	return null;
}, Hi = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = ki(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = Vi(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
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
}, Ui = (e, t, n, r) => {
	let { parent: i, key: a } = Hi(e, t, r);
	return (Mn[t.action] || jn)(i, a, n), e;
}, Wi = (e) => typeof e == "object" && !!e && !Array.isArray(e), Gi = (e, t) => {
	if (!Wi(e)) return null;
	if (e[t] !== void 0) return e[t];
	let n = `show${t.charAt(0).toUpperCase()}${t.slice(1)}`;
	return e[n] === void 0 ? null : e[n];
}, Ki = (e, n) => {
	let r = i[e];
	if (r) for (let e of r) {
		if (e.skipIf && ki(n, e.skipIf, { returnArray: !0 }).length > 0) continue;
		let r = t[e.templateKey];
		try {
			Ui({ base: n }, e.destinationPath, r);
		} catch {}
	}
}, qi = ({ options: e = {}, optionDefs: t = {}, base: n, showLog: r = !1 } = {}) => {
	if (!n || !Wi(e) || !Wi(t)) return n;
	for (let [r, i] of Object.entries(t)) {
		if (!Wi(i)) continue;
		let t = Gi(e, r);
		if (!t) continue;
		let a = typeof t == "boolean" && t === !0, o = Wi(t);
		if ((a || o) && Object.entries(i).some(([e]) => e !== "initialize" && (a || t[e] === !0))) {
			i.initialize && Ki(i.initialize, n);
			for (let [e, r] of Object.entries(i)) e !== "initialize" && (a || t[e] === !0) && Ki(r, n);
		}
	}
	return n;
}, Ji = {
	name: "json-renderers-run-instructions",
	version: "1.16.1"
}, Yi = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.runInstructions ??= {}, globalThis.ks.jsonRenderers.runInstructions.render = {
		meta: Ji,
		renderFunc: e
	});
}, Xi = ({ instructionMainKey: t, instructionSubKey: n, data: r, options: i, showLog: a = !1 } = {}) => {
	let o = e[t]?.[n];
	if (!o) throw Error(`Definition not found: ${t}.${n}`);
	let s = structuredClone(c[o.baseFromSpec]), c = kn({
		instructions: o.instructions ?? [],
		baseKey: o.baseFromSpec,
		data: r,
		showLog: a
	});
	return qi({
		options: i,
		optionDefs: o.options && typeof o.options == "object" ? o.options : e[t]?.options ?? {},
		base: c,
		data: r,
		showLog: a
	}), s;
};
Yi(Xi);
export { Xi as default };
