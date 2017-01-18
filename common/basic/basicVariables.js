'use strict';

const BasicVariables = {
  BASEURL: 'http://ben.eng31.servicemax.io',
  DEFINITION: {
    WORKORDER: {
      "tabs": [
        {
          "id": "tabs_overview",
          "label": "Overview",
          "sections": [
            {
              "label": "Work Order Information",
              "hidelabel": "false",
              "columns": [
                [
                  {
                    "identifier": "svmx_work_order_number",
                    "label": "Work Order Number"
                  },
                  {
                    "identifier": "svmx_account",
                    "label": "Account"
                  },
                  {
                    "identifier": "svmx_contact",
                    "label": "Contact"
                  },
                  {
                    "identifier": "svmx_top_level_product",
                    "label": "Top Level Product"
                  },
                  {
                    "identifier": "svmx_product",
                    "label": "Product"
                  },
                  {
                    "identifier": "svmx_installed_product",
                    "label": "Installed Product"
                  }
                ],
                [
                  {
                    "identifier": "svmx_case",
                    "label": "Case"
                  },
                  {
                    "identifier": "svmx_priority",
                    "label": "Priority"
                  },
                  {
                    "identifier": "svmx_status",
                    "label": "Status"
                  },
                  {
                    "identifier": "svmx_type",
                    "label": "Type"
                  },
                  {
                    "identifier": "svmx_is_customer_down",
                    "label": "Is Customer Down"
                  }
                ]
              ],
              "id": "s1478671729985"
            },
            {
              "label": "Descriptions",
              "hidelabel": "false",
              "columns": [
                [
                  {
                    "identifier": "svmx_subject",
                    "label": "Subject"
                  },
                  {
                    "identifier": "svmx_instructions",
                    "label": "Instructions"
                  }
                ]
              ],
              "id": "s1478717408184"
            },
            {
              "label": "Service Location",
              "hidelabel": "false",
              "columns": [
                [
                  {
                    "identifier": "svmx_street",
                    "label": "Street"
                  },
                  {
                    "identifier": "svmx_city",
                    "label": "City"
                  },
                  {
                    "identifier": "svmx_state",
                    "label": "State/Province"
                  },
                  {
                    "identifier": "svmx_postal_code",
                    "label": "Postal Code"
                  },
                  {
                    "identifier": "core_country",
                    "label": "Country"
                  }
                ],
                [
                  {
                    "identifier": "svmx_location",
                    "label": "Location"
                  },
                  {
                    "identifier": "svmx_driving_time",
                    "label": "Driving Time (In Minutes)"
                  },
                  {
                    "identifier": "svmx_longitude",
                    "label": "Longitude"
                  },
                  {
                    "identifier": "svmx_latitude",
                    "label": "Latitude"
                  }
                ]
              ],
              "id": "s1478671729990"
            },
            {
              "label": "Key Dates & Times",
              "hidelabel": "false",
              "columns": [
                [
                  {
                    "identifier": "io_created_on",
                    "label": "Created On"
                  },
                  {
                    "identifier": "svmx_scheduled_on",
                    "label": "Scheduled On"
                  },
                  {
                    "identifier": "svmx_completed_on",
                    "label": "Completed On"
                  },
                  {
                    "identifier": "svmx_canceled_on",
                    "label": "Canceled On"
                  }
                ],
                [
                  {
                    "identifier": "svmx_closed_on",
                    "label": "Closed On"
                  },
                  {
                    "identifier": "svmx_closed_by",
                    "label": "Closed By"
                  }
                ]
              ],
              "id": "s1478671729991"
            },
            {
              "label": "Billing Details",
              "hidelabel": "false",
              "columns": [
                [
                  {
                    "identifier": "svmx_billing_type",
                    "label": "Billing Type"
                  }
                ],
                []
              ],
              "id": "s1478673309076"
            },
            {
              "label": "Closure",
              "hidelabel": "false",
              "columns": [
                [
                  {
                    "identifier": "svmx_work_performed",
                    "label": "Work Performed"
                  }
                ]
              ],
              "id": "s1478671729986"
            }
          ]
        },
        {
          "id": "tabs-1478674744925",
          "label": "Work Details",
          "sections": [
            {
              "label": "Parts Consumed",
              "hidelabel": "true",
              "columns": [
                [
                  {
                    "relatedlist": true,
                    "label": "Parts Consumed",
                    "id": "r1478674742586",
                    "uuid": "ac12366b-5294-4baf-9c0f-48180d88cff0",
                    "pc": "parent",
                    "st": "",
                    "to": "02ff55f0-7b62-49bb-85e2-c74d928efba8",
                    "displayusing": "predefined",
                    "listview": "57ce9b39-62be-4edc-84cc-cf5d146b3eff",
                    "listheight": "10"
                  }
                ]
              ],
              "id": "s1478674742585",
              "relatedlist": true
            },
            {
              "label": "Labor",
              "hidelabel": "true",
              "columns": [
                [
                  {
                    "relatedlist": true,
                    "label": "Labor",
                    "id": "r1478937217729",
                    "uuid": "7edd3a95-8b87-42c7-ae99-5546931c71fb",
                    "pc": "parent",
                    "st": "",
                    "to": "76a315bc-11c9-43c8-ab5b-bcc419919410",
                    "displayusing": "predefined",
                    "listview": "64be729d-80de-4d36-b9f4-11f84756c4ee",
                    "listheight": "10"
                  }
                ]
              ],
              "id": "s1478674742587",
              "relatedlist": true
            },
            {
              "label": "Expenses",
              "hidelabel": "true",
              "columns": [
                [
                  {
                    "relatedlist": true,
                    "label": "Expenses",
                    "id": "r1478937217731",
                    "uuid": "c621bb7b-64e3-4e86-ac49-bcf397cd111a",
                    "pc": "parent",
                    "st": "",
                    "to": "c52f94e7-5de0-4350-a68a-0559b460073c",
                    "displayusing": "predefined",
                    "listview": "709c7af8-9a6f-4573-b84f-7fd47ca9f25b",
                    "listheight": "10"
                  }
                ]
              ],
              "id": "s1478937217730",
              "relatedlist": true
            }
          ]
        },
        {
          "id": "tabs-1478674903203",
          "label": "Descriptions",
          "sections": [
            {
              "label": "Descriptions",
              "hidelabel": "true",
              "columns": [
                [
                  {
                    "identifier": "io_tags",
                    "label": "Tags"
                  },
                  {
                    "identifier": "io_description",
                    "label": "Description"
                  }
                ]
              ],
              "id": "s1478674901109"
            }
          ]
        },
        {
          "id": "tabs_details",
          "label": "System Info",
          "sections": [
            {
              "label": "Ownership",
              "hidelabel": "true",
              "columns": [
                [
                  {
                    "identifier": "io_owner",
                    "label": "Owner"
                  },
                  {
                    "identifier": "io_created_by",
                    "label": "Created By"
                  }
                ],
                [
                  {
                    "identifier": "io_updated_by",
                    "label": "Updated By"
                  },
                  {
                    "identifier": "io_updated_on",
                    "label": "Updated On"
                  }
                ]
              ],
              "id": "s1478671729988"
            },
            {
              "label": "Record",
              "hidelabel": "false",
              "columns": [
                [
                  {
                    "identifier": "io_uuid",
                    "label": "Record ID"
                  },
                  {
                    "identifier": "io_package",
                    "label": "Package"
                  }
                ],
                [
                  {
                    "identifier": "io_active",
                    "label": "Active"
                  },
                  {
                    "identifier": "io_deleted",
                    "label": "Deleted"
                  },
                  {
                    "identifier": "io_private",
                    "label": "Private"
                  }
                ]
              ],
              "id": "s1478671729989"
            }
          ]
        },
        {
          "id": "tabs-attachments",
          "label": "Attachments",
          "sections": []
        },
        {
          "id": "related-records-tab",
          "label": "Relations",
          "sections": []
        }
      ],
    }
  }
}
module.exports =  BasicVariables;
