/**
 * 存放查询条件的js，定义全项目的查询条件
 */

var Condition = function(){


    var _condRules = {

        //例子 autofill
        designer : {
            label : "设计师",//中文名
            type : "autofill",//类型
            submitConfig : {//向后台提交的配置
                name : "designer",//接口中的参数名
                op : "cn",//查询方式
                validate: null//校验规则
            },
            dataSource : {//从后台取数据的各种配置
                url : api.personel.queryUserForNameByDuty,//获取数据要调用的接口
                postData:{ "duty" : "设计师" },//获取数据时的请求参数
                listPath: "autoFillKeyValue",//响应list的json路径
                keyPath:"key",//用来向后台提交的字段的json路径
                valuePath:"value"//用来在页面显示的字段的json路径
            }
        },
        //text
        orderId : { //
            label:"订单编号",
            type:"text",
            submitConfig : {
                name : "orderId",
                op : "eq",
                validate:{
                    "reg" : /^[0-9]*$/,
                    "msg" : "请输入数字"
                }
            }
        },
        //select
        designerRegionId : {
            label:"设计中心",
            type:"select",
            submitConfig : {
                name : "designerRegionId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.department.queryDepartment,
                postData:{ "dept.type" : "设计大区" },
                listPath: "deptList",
                keyPath:"deptId",
                valuePath:"deptName"
            }
        },
        //timeRange
        createTimeDateRange : {
            label:"量尺时间",
            type:"dateRangePicker",
            submitConfig : {
                name : "createTimeDateRange",
                op : "cn",
                validate:null
            }
        },

        //-------订单-施工进度-工程验收
        acceptanceFlag : {
            label:"验收状态",
            type:"select",
            submitConfig : {
                name : "acceptanceFlag",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : null,
                postData : null,
                listPath : [
                    {key: "notAcceptanced", value: "未验收"},
                    {key: "acceptanced", value: "已验收"}
                ],
                keyPath : "key",
                valuePath : "value"
            }
        },

        //-------订单-施工进度-监理控制查询条件
        schedule : {
            label:"进度",
            type:"select",
            submitConfig : {
                name : "schedule",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.ds.constructionInfo,
                postData:{ "timestamp" : (new Date).getTime() },
                listPath: "constructionSchedule",
                keyPath:"key",
                valuePath:"value"
            }
        },
        projectStatusFlag : {
            label:"完工状态",
            type:"select",
            submitConfig : {
                name : "projectStatus",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : null,
                postData : null,
                listPath: [
                    {key: "未完工", value: "未完工"},
                    {key: "已完工", value: "已完工"}
                ],
                keyPath:"key",
                valuePath:"value"
            }
        },
        //-------订单-施工进度-巡检控制查询条件
        supervisor : {
	        label : "监理",//中文名
	            type : "autofill",//类型
	            submitConfig : {//向后台提交的配置
	            name : "supervisor",//接口中的参数名
	                op : "cn",//查询方式
	                validate: null//校验规则
	        },
	        dataSource : {//从后台取数据的各种配置
	            url : api.personel.queryUserForNameByDuty,//获取数据要调用的接口
	                postData:{ "duty" : "监理" },//获取数据时的请求参数
	            listPath: "autoFillKeyValue",//响应list的json路径
	                keyPath:"key",//用来向后台提交的字段的json路径
	                valuePath:"value"//用来在页面显示的字段的json路径
	        }
	    },
        //-------订单-施工进度-质检控制查询条件
        allocationWorkerFlag : {
            label:"分配状态",
                type:"select",
                submitConfig : {
                name : "allocationWorkerFlag",
                    op : "eq",
                    validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : null,
                    postData : null,
                listPath: [
                    {key: "notAllocationed",value: "未分配工人"},
                    {key: "allocationed",value: "已分配工人"}
                ],
                keyPath:"key",
                valuePath:"value"
            }
        },

        //-------系统
        regionName: {
            label:"大区名称",
            type:"text",
            submitConfig : {
                name : "regionName",
                op : "cn",
                validate:null
            }
        },
        cityName: {
            label:"城市名称",
            type:"text",
            submitConfig : {
                name : "cityName",
                op : "cn",
                validate:null
            }
        },
        cityProperName: {
            label:"城区名称",
            type:"text",
            submitConfig : {
                name : "cityProperName",
                op : "cn",
                validate:null
            }
        },
        subFunctionName: {
            label:"自功能名称",
            type:"text",
            submitConfig : {
                name : "subFunctionName",
                op : "cn",
                validate:null
            }
        },
        roleName: {
            label:"角色名称",
            type:"text",
            submitConfig : {
                name : "roleName",
                op : "cn",
                validate:null
            }
        },
        region: {
            label:"所属大区",
            type:"select",
            submitConfig : {
                name : "regionId",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : api.system.queryRegion,
                postData:{},
                listPath: "regionList",
                keyPath:"regionId",
                valuePath:"regionName"
            }
        },
        city: {
            label:"所属城市",
            type:"select",
            submitConfig : {
                name : "cityId",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : api.system.queryCity,
                postData:{},
                listPath: "cityList",
                keyPath:"cityId",
                valuePath:"cityName"
            }
        },

        //-------部门 
        sdeptName: {
            label:"大区名称",
            type:"text",
            submitConfig : {
                name : "deptName",
                op : "cn",
                validate:null
            }
        },
        deptName: {
            label:"部门名称",
            type:"text",
            submitConfig : {
                name : "deptName",
                op : "cn",
                validate:null
            }
        },

        //-------信息-公告查询条件
        theme : { //
            label:"主题",
            type:"text",
            submitConfig : {
                name : "theme",
                op : "cn",
                validate:null
            }
        },
        dateRange : {
            label:"时间",
            type:"dateRangePicker",
            submitConfig : {
                name : "dateRange",
                op : "cn",
                validate:null
            }
        },

        //-------信息-活动查询条件

        activityName : { //
            label:"名称",
            type:"text",
            submitConfig : {
                name : "activityName",
                op : "cn",
                validate:null
            }
        },

        activityStatus : {
            label:"类型",
            type:"select",
            submitConfig : {
                name : "status",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : null,
                postData:null,
                listPath: [{key : "0", value : "\u6709\u6548"}, {key : "1", value: "\u65e0\u6548"}],
                keyPath:"key",
                valuePath:"value"
            }
        },

        //-------增减项查询条件
        addReduceType : {
            label:"类型",
            type:"select",
            submitConfig : {
                name : "addReduceType",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : null,
                postData:null,
                listPath: [{"key":"0","value":"增项"}, {"key":"1","value":"减项"},{"key":"2","value":"漏项"}],
                keyPath:"key",
                valuePath:"value"
            }
        },

        //-------数据-报价-报价版本
        versionName : { //
            label:"版本名称",
            type:"text",
            submitConfig : {
                name : "versionName",
                op : "cn",
                validate:null
            }
        },

        //--------数据-报价-报价项

        itemName : { //
            label:"名称",
            type:"text",
            submitConfig : {
                name : "itemName",
                op : "cn",
                validate:null
            }
        },

        quotationTypeId : {
            label:"类型",
            type:"select",
            submitConfig : {
                name : "quotationTypeId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.quotation.queryQuotationType,
                postData:{},
                listPath: "quotationTypes",
                keyPath:"id",
                valuePath:"name"
            }
        },

        quotationClassificationId : {
            label:"分类",
            type:"select",
            submitConfig : {
                name : "quotationClassificationId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.quotation.queryQuotationClassification ,
                postData:{},
                listPath: "quotationClassifications",
                keyPath:"id",
                valuePath:"name"
            }
        },

        quotationBigCategoryId : {
            label:"大类",
            type:"select",
            submitConfig : {
                name : "quotationBigCategoryId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.quotation.queryQuotationBigCategory,
                postData:{},
                listPath: "quotationBigCategorys",
                keyPath:"id",
                valuePath:"name"
            }
        },

        quotationSmallCategoryId : {
            label:"小类",
            type:"select",
            submitConfig : {
                name : "quotationSmallCategoryId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.quotation.queryQuotationSmallCategory,
                postData:{ },
                listPath: "quotationSmallCategorys",
                keyPath:"id",
                valuePath:"name"
            }
        },

        versionId : {
            label:"版本",
            type:"select",
            submitConfig : {
                name : "versionId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.quotation.queryQuotationVersion,
                postData:{},
                listPath: "quotationVersions",
                keyPath:"versionId",
                valuePath:"versionName"
            }
        },

        quotationWorkTypeId : {
            label:"工种",
            type:"select",
            submitConfig : {
                name : "quotationWorkTypeId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.common.queryWorkType,
                postData:{},
                listPath: "workTypes",
                keyPath:"id",
                valuePath:"name"
            }
        },

        //--------数据-楼盘
        villageName :  {
            label : "楼盘名称",
            type : "autofill",
            submitConfig : {
                name : "villageName",
                op : "cn",
                validate: null
            },
            dataSource : {
                url : api.data.queryVillageForNameByPinyin,
                postData:{},
                listPath: "autoFillKeyValue",
                keyPath:"key",
                valuePath:"value"
            }
        },
        cityId :  {
            label:"所属城市",
            type:"select",
            submitConfig : {
                name : "cityId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.system.queryCity,
                postData:{},
                listPath: "cityList",
                keyPath: "cityId",
                valuePath: "cityName"
            }
        },
        cityProperId : null,


        //---------数据-主材-型号 页面的各种查询条件
        materialModelNo : { //
            label:"编号",
            type:"text",
            submitConfig : {
                name : "materialModelNo",
                op : "cn",
                validate : null
            }
        },
        materialModelName : { //
            label:"名称",
            type:"text",
            submitConfig : {
                name : "materialModelName",
                op : "cn",
                validate : null
            }
        },
        materialTypeId : {
            label:"品类",
            type:"select",
            submitConfig : {
                name : "materialTypeId",
                op : "cn",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.data.queryCategory,
                postData:{},
                listPath: "categorys",
                keyPath:"cid",
                valuePath:"categoryName"
            }
        },
        materialerName : {
            label : "姓名",
            type : "autofill",
            submitConfig : {
                name : "userName",
                op : "cn",
                validate: null
            }, dataSource : {
                url : api.personel.queryUserForNameByPinyinName,
                postData:{"duty": "驻店导购"},
                listPath: "autoFillKeyValue",
                keyPath:"key",
                valuePath:"value"
            }
        },
        categoryId : {
            label:"品类",
            type:"select",
            submitConfig : {
                name : "categoryId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.data.queryCategory,
                postData:{},
                listPath: "categorys",
                keyPath:"cid",
                valuePath:"categoryName"
            }
        },
        categoryName : {
            label:"名称",
            type:"text",
            submitConfig : {
                name : "categoryName",
                op : "eq",
                validate : null
            }
        },
        brandName : {
            label:"名称",
            type:"text",
            submitConfig : {
                name : "brandName",
                op : "cn",
                validate : null
            }
        },
        //--------人事-员工 页面的各种查询条件
        userId : { //
            label:"员工号",
            type:"text",
            submitConfig : {
                name : "userId",
                op : "eq",
                validate:null
            }
        },
        userName : {
            label : "姓名",
            type : "autofill",
            submitConfig : {
                name : "userName",
                op : "cn",
                validate: null
            },
            dataSource : {
                url : api.personel.queryUserForNameByPinyinName,
                postData:{},
                listPath: "autoFillKeyValue",
                keyPath:"key",
                valuePath:"value"
            }
        },
        identity : { //
            label:"身份证号",
            type:"text",
            submitConfig : {
                name : "identity",
                op : "eq",
                validate:null
            }
        },
        roleId : {
            label:"角色",
            type:"select",
            submitConfig : {
                name : "roleId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.system.queryRole,
                postData:{},
                listPath: "roleList",
                keyPath:"roleId",
                valuePath:"roleName"
            }
        },
        deptType : {
            label:"部门类型",
            type:"select",
            submitConfig : {
                name : "deptType",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : api.ds.departmentInfo,
                postData:{},
                listPath: "deptType",
                keyPath:null,
                valuePath:null
            }
        },
        deptId : {
            label:"部门",
            type:"select",
            submitConfig : {
                name : "deptId",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.department.queryDepartment,
                postData:{"dept.type" : "all"},
                listPath: "deptList",
                keyPath: "deptId",
                valuePath: "deptName"
            }
        },
        userstatus : {
            label:"状态",
            type:"select",
            submitConfig : {
                name : "status",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.ds.personInfo,
                postData:{},
                listPath: "statusType",
                keyPath:null,
                valuePath:null
            }
        },
        //装修订单-设计 页面的各种查询条件
        village : {
            label:"楼盘",
            type:"autofill",
            submitConfig : {
                name : "village",
                op : "cn",
                validate:null
            },
            dataSource : {
                url : api.data.queryVillageForNameByPinyin,
                postData:{},
                listPath: "autoFillKeyValue",
                keyPath:"key",
                valuePath:"value"
            }
        },
        houseNumber : {
            label:"楼号",
            type:"text",
            submitConfig : {
                name : "houseNumber",
                op : "cn",
                validate:null
            }
        },
        houseArea : {
            label:"面积",
            type:"text",
            submitConfig : {
                name : "houseArea",
                op : "eq",
                validate:{
                    "reg" : /^[0-9]*$/,
                    "msg" : "请输入数字"
                }
            }
        },
        customerId: {
        	label:"客户编号",
            type:"text",
            submitConfig : {
                name : "customerId",
                op : "cn",
                validate:null
            }
        },
        customerPhone : {
            label:"客户电话",
            type:"text",
            submitConfig : {
                name : "customerPhone",
                op : "cn",
                validate:{
                    "reg" : /^[0-9]*$/,
                    "msg" : "请输入数字"
                }
            }
        },
        relationshipType : {
            label:"关系客户",
            type:"select",
            submitConfig : {
                name : "relationshipType",
                op : "eq",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.ds.customerInfo,
                postData:{},
                listPath: "relationshipType",
                keyPath:"key",
                valuePath:"value"
            }
        },
        salesman : {
            label:"业务员",
            type : "autofill",
            submitConfig : {//向后台提交的配置
                name : "salesman",//接口中的参数名
                op : "cn",//查询方式
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.personel.queryUserForNameByDuty,//获取数据要调用的接口
                postData:{ "duty" : "业务" },//获取数据时的请求参数
                listPath: "autoFillKeyValue",//响应list的json路径
                keyPath:"key",//用来向后台提交的字段的json路径
                valuePath:"value"//用来在页面显示的字段的json路径
            }
        },
        designerDepartmentId : {
            label:"设计部",
            type:"select",
            submitConfig : {
                name : "designerDepartmentId",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : api.department.queryDepartment,
                postData:{ "dept.type" : "设计部" },
                listPath: "deptList",
                keyPath:"deptId",
                valuePath:"deptName"
            }
        },
        salesmanRegionId : {
            label:"业务中心",
            type:"select",
            submitConfig : {
                name : "salesmanRegionId",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : api.department.queryDepartment,
                postData:{ "dept.type" : "业务大区" },
                listPath: "deptList",
                keyPath:"deptId",
                valuePath:"deptName"
            }
        },
        salesmanDepartmentId : {
            label:"业务部",
            type:"select",
            submitConfig : {
                name : "salesmanDepartmentId",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : api.department.queryDepartment,
                postData:{ "dept.type" : "all" },
                listPath: "deptList",
                keyPath:"deptId",
                valuePath:"deptName"
            }
        },
        signTimeDateRange : {
            label:"签单时间",
            type:"dateRangePicker",
            submitConfig : {
                name : "signTimeDateRange",
                op : "cn",
                validate:null
            }
        },
        houseClass : {
            label:"房屋类型",
            type:"select",
            submitConfig : {
                name : "houseClass",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : api.ds.houseInfo,
                postData:{ "timestamp": new Date().getTime()},
                listPath: "houseClass",
                keyPath:"key",
                valuePath:"value"
            }
        },
        status : {
            label:"状态",
            type:"select",
            submitConfig : {
                name : "status",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : api.ds.decorationInfo,
                postData:{ "timestamp": new Date().getTime() },
                listPath: "decorationOrderStatus",
                keyPath:"key",
                valuePath:"value"
            }
        },
        approvalType: {
            label:"审批类型",
            type:"select",
            submitConfig : {
                name : "type",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : api.ds.approvalType,
                postData:{ "timestamp": new Date().getTime() },
                listPath: "approvalType",
                keyPath:"key",
                valuePath:"value"
            }
        },
        // 收款
        orderAddr : {
            label:"楼盘",
            type:"text",
            submitConfig : {
                name : "orderAddr",
                op : "cn",
                validate:null
            }
        },
        collectTimeDateRange : {
            label:"收款时间",
            type:"dateRangePicker",
            submitConfig : {
                name : "collectTime",
                op : "between",
                validate:null
            }
        },
        advancePaymentcollectTime: {
            label:"收款时间",
            type:"dateRangePicker",
            submitConfig : {
                name : "collectTimeDateRange",
                op : "between",
                validate:null
            }
        },
		// 主材
        msoNo : {
            label:"主材号",
            type:"text",
            submitConfig : {
                name : "msoNo",
                op : "eq",
                validate:null
            }
        }, msoDesigner: {
        	label : "设计师",//中文名
            type : "autofill",//类型
            submitConfig : {//向后台提交的配置
                name : "designerName",//接口中的参数名
                op : "cn",//查询方式
                validate: null//校验规则
            },
            dataSource : {//从后台取数据的各种配置
                url : api.personel.queryUserForNameByDuty,//获取数据要调用的接口
                postData:{ "duty" : "设计师" },//获取数据时的请求参数
                listPath: "autoFillKeyValue",//响应list的json路径
                keyPath:"key",//用来向后台提交的字段的json路径
                valuePath:"value"//用来在页面显示的字段的json路径
            }
        }, fullCollectTimeRange: {
            label:"收款时间",
            type:"dateRangePicker",
            submitConfig : {
                name : "fullCollectTimeRange",
                op : "between",
                validate:null
            }
        }, msalesman: {
            label:"业务员",
            type : "autofill",
            submitConfig : {//向后台提交的配置
                name : "salesman",//接口中的参数名
                op : "cn",//查询方式
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.personel.queryUserForNameByDuty,//获取数据要调用的接口
                postData:{},//获取数据时的请求参数
                listPath: "autoFillKeyValue",//响应list的json路径
                keyPath:"key",//用来向后台提交的字段的json路径
                valuePath:"value"//用来在页面显示的字段的json路径
            }
        }, materialOutPaymentStatus: {
            label:"状态",
            type:"select",
            submitConfig : {
                name : "status",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : null,
                postData : null,
                listPath: [
                    {key: "0", value: "待收款"},
                    {key: "1", value: "已收款"},
                    {key: "2", value: "退款"}
                ],
                keyPath:"key",
                valuePath:"value"
            }
        }, materialType : {
            label:"品类",
            type:"select",
            submitConfig : {
                name : "materialType",
                op : "cn",
                validate:null
            },
            dataSource : {//从后台取数据的各种配置
                url : api.data.queryCategory,
                postData:{},
                listPath: "categorys",
                keyPath:"categoryName",
                valuePath:"categoryName"
            }
        }, materialBrand : {
            label:"品牌",
            type:"text",
            submitConfig : {
                name : "materialBrand",
                op : "cn",
                validate:null
            }
        },
        // 放线
        actualDate : {
            label:"放线时间",
            type:"datePicker",
            submitConfig : {
                name : "actualDate",
                op : "between",
                validate:null
            }
        }, drawLineStatus: {
            label:"状态",
            type:"select",
            submitConfig : {
                name : "status",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : null,
                postData : null,
                listPath: [
                    {"key":"申请放线","value":"申请放线"},
                    {"key":"放线失败","value":"放线失败"},
                    {"key":"放线成功","value":"放线成功"}
                ],
                keyPath:"key",
                valuePath:"value"
            }
        },
        // 日志
        loginId : {
            label:"帐号",
            type:"text",
            submitConfig : {
                name : "loginId",
                op : "eq",
                validate:null
            }
        }, sourceIp : {
            label:"IP",
            type:"text",
            submitConfig : {
                name : "sourceIp",
                op : "eq",
                validate:null
            }
        }, loginTime: {
            label:"收款时间",
            type:"dateRangePicker",
            submitConfig : {
                name : "loginTime",
                op : "between",
                validate:null
            }
        }, successFlag: {
            label:"状态",
            type:"select",
            submitConfig : {
                name : "successFlag",
                op : "eq",
                validate:null
            },
            dataSource : {
                url : null,
                postData : null,
                listPath: [
                    {key: "1", value: "成功"},
                    {key: "0", value: "失败"}
                ],
                keyPath:"key",
                valuePath:"value"
            }
        }
    };
    return {
        getRuleByCondName:function(condName){
            return _condRules[condName];
        }
    }
}();