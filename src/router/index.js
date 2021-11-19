/**
 * Router index
 */
import Vue from "vue";
import Router from "vue-router";
import store from '@/store';

import Main from '@/views/Main';

import {NoPermission} from "workplace-vue-common-ui";
import {NotFound} from "workplace-vue-common-ui";
import {GeneralError} from "workplace-vue-common-ui";

import Dashboard from '@/views/home/Dashboard';
import Timeline from '@/views/home/Timeline';
import GettingStarted from '@/views/home/GettingStarted';

// 아래 두개 파일은 파일을 삭제하는 시점에 주석을 제거할 예정임. 당분간 그대로 둘 것.
import PayrollPayDay from "@/views/payroll/PayrollPayDay";
import EmpSelect from "@/views/payroll/EmpSelect";

import SamplePage from '@/views/samples/SamplePage';
import PayDay   from '@/views/payroll/PayDay';
import PayDayOpen   from '@/views/payroll/PayDayOpen';
import PayEntry   from '@/views/payroll/PayEntry';

import HealthEmployment from '@/views/payroll/pay_entry/HealthEmployment';
import HealthEmploymentSetting from '@/views/payroll/pay_entry/HealthEmploymentSetting';

import PayrollLedger   from '@/views/payroll/pay_query/PayrollLedger';
import SalaryHistory   from '@/views/payroll/pay_query/SalaryHistory';
import TaxLedger       from '@/views/payroll/pay_query/TaxLedger';
import PaySpecification       from '@/views/payroll/pay_query/PaySpecification';
import SubjectManagement from '@/views/payroll/subject_management/SubjectManagement';
import WorkResult from '@/views/payroll/closing_the_basics/WorkResult';
import LeaveOfAbsence from '@/views/payroll/closing_the_basics/LeaveOfAbsence';


import PayReview   from '@/views/payroll/analytical_review/PayReview';
import PaycheckReport from '@/views/payroll/analytical_review/PaycheckReport';

import PayAccountVerify from '@/views/payroll/pay_file/PayAccountVerify';
import GenBankTransferFile from '@/views/payroll/pay_file/GenBankTransferFile';
import GenPayCheck from '@/views/payroll/pay_file/GenPayCheck';

import EarnedIncomeSource from '@/views/payroll/pay_tax_file/EarnedIncomeSource';
import IncomeTaxSource from '@/views/payroll/pay_tax_file/IncomeTaxSource';

import EarnedIncomeReport from '@/views/payroll/pay_tax_report/EarnedIncomeReport';
import ResidentTaxReport from '@/views/payroll/pay_tax_report/ResidentTaxReport';
import WithholdingTaxReport from '@/views/payroll/pay_tax_report/WithholdingTaxReport';
import WithholdingInput from '@/views/payroll/pay_tax_report/WithholdingInput';

// import SocialInsurance   from '@/views/payroll/SocialInsurance';
import TotalRemuneration from '@/views/payroll/social_insurance/TotalRemuneration';
import AcquisitionJob from '@/views/payroll/social_insurance/AcquisitionJob';
import LossJob from '@/views/payroll/social_insurance/LossJob';

import DworkTax   from '@/views/dwork/DworkTax';
import DworkPayQuery   from '@/views/dwork/DworkPay/DworkPayQuery';
import DworkBank   from '@/views/dwork/DworkBank';
import DworkTaxReport   from '@/views/dwork/DworkTaxReport';
import SevPayEntry   from '@/views/sev/SevPayEntry/SevPayEntry';
import SevPayCreate from "@/views/sev/SevPayEntry/SevPayCreate";
import SevPayDelete from "@/views/sev/SevPayEntry/SevPayDelete";
import SevPayAvg from '@/views/sev/SevPayEntry/SevPayAvg';
import SevPayExe from '@/views/sev/SevPayEntry/SevPayExe';
import SevPayDayBet from '@/views/sev/SevPayEntry/SevPayDayBet';
import SevPayCalc from '@/views/sev/SevPayEntry/SevPayCalc';
import SevTax   from '@/views/sev/SevTax/SevTax';
import SevPension   from '@/views/sev/SevPension/SevPension';
import SevPensionMatterMgt from '@/views/sev/SevPension/SevPensionMatterMgt';
import SevPensionCalc from '@/views/sev/SevPension/SevPensionCalc';

import SevPensionCalcResultAvg from '@/views/sev/SevPension/SevPensionCalcResultAvg';
import SevPensionCalcResultCal from '@/views/sev/SevPension/SevPensionCalcResultCal';
import SevPensionCalcResultTen from '@/views/sev/SevPension/SevPensionCalcResultTen';

import SevPensionCalcMgt from '@/views/sev/SevPension/SevPensionCalcMgt';
import SevPensionCalcDelete from '@/views/sev/SevPension/SevPensionCalcDelete';
import SevPensionSaving from '@/views/sev/SevPension/SevPensionSaving';
import SevPensionSavingSearch from '@/views/sev/SevPension/SevPensionSavingSearch';
// import SevPayQuery   from '@/views/sev/SevPayQuery';
import SevPayQueryAvg from '@/views/sev/SevPayQuery/SevPayQueryAvg';
import SevPayQueryTax from '@/views/sev/SevPayQuery/SevPayQueryTax';
import SevPayQueryCalc from '@/views/sev/SevPayQuery/SevPayQueryCalc';
import SevPayQueryDayBet from '@/views/sev/SevPayQuery/SevPayQueryDayBet';
import SevPayQueryExe from '@/views/sev/SevPayQuery/SevPayQueryExe';
import SevPayQueryPer from '@/views/sev/SevPayQuery/SevPayQueryPer';
import SevPayQuery from '@/views/sev/SevPayQuery/SevPayQuery';
import SevPensionQuery from '@/views/sev/SevPayQuery/SevPensionQuery';
import SevPensionQueryAvg from '@/views/sev/SevPayQuery/SevPensionQueryAvg'
import SevPensionQueryPen from '@/views/sev/SevPayQuery/SevPensionQueryPen'
import SevPensionQueryCal from '@/views/sev/SevPayQuery/SevPensionQueryCal'
import SevFile   from '@/views/sev/SevFile/SevFile';
import SevTaxFile   from '@/views/sev/SevTaxFile';
import SevTaxReport   from '@/views/sev/SevTaxReport/SevTaxReport';
import BizincEarner   from '@/views/bizinc/earner/BizincEarner';
import BizincIncome   from '@/views/bizinc/bizinc/BizincIncome';
import BizincIncomeQuery from '@/views/bizinc/bizinc/BizincIncomeQuery';
import BizincIncomeReport from '@/views/bizinc/bizinc/BizincIncomeReport';
import BizincOtherInc   from '@/views/bizinc/other/BizincOtherInc';
import BizincOtherReport  from '@/views/bizinc/other/BizincOtherReport';
import BizincOtherQuery from '@/views/bizinc/other/BizincOtherQuery';
import BizincInterest   from '@/views/bizinc/interest/BizincInterest';
import BizincNonResid   from '@/views/bizinc/nonresid/BizincNonResid';
import BizincNonResidQuery from '@/views/bizinc/nonresid/BizincNonResidQuery';
import BizincNonResidReport from '@/views/bizinc/nonresid/BizincNonResidReport';
import BizincVirtualAsset from '@/views/bizinc/virtual/BizincVirtualAsset';
import BizincVirtualAssetQuery from '@/views/bizinc/virtual/BizincVirtualAssetQuery';
import BizincVirtualAssetReport from '@/views/bizinc/virtual/BizincVirtualAssetReport';
import BizincTaxReport   from '@/views/bizinc/report/BizincTaxReport';
import BizincTaxSimpleReport   from '@/views/bizinc/report/BizincTaxSimpleReport';
import CfgCode   from '@/views/cfg/CfgCode/CfgCode';
import CfgYearSalary   from '@/views/cfg/CfgCode/CfgYearSalary';
import CfgOvertimeCode from '@/views/cfg/CfgCode/CfgOvertimeCode';
import CfgMasterCode   from '@/views/cfg/CfgMasterCode/CfgMasterCode';
import CfgHobongTable from '@/views/cfg/CfgMasterCode/CfgHobongTable';

import CfgHobongPayMaster from '@/views/cfg/CfgMasterCode/CfgHobongPayMaster';

import CfgAnnualSalaryTable from '@/views/cfg/CfgMasterCode/CfgAnnualSalaryTable';

import CfgAnnualSalaryPayMaster from '@/views/cfg/CfgMasterCode/CfgAnnualSalaryPayMaster';

import CfgCalc   from '@/views/cfg/CfgCalc/CfgCalc';
import CfgCalcInput from '@/views/cfg/CfgCalc/CfgCalcInput';
import CfgOverTimeCalc from '@/views/cfg/CfgCalc/CfgOverTimeCalc';
import CfgRetireCalc from '@/views/cfg/CfgCalc/CfgRetireCalc';
import CfgRetireCalcInput from '@/views/cfg/CfgCalc/CfgRetireCalcInput';

import CfgReport   from '@/views/cfg/CfgReport/CfgReport';
import CfgReportInput from '@/views/cfg/CfgReport/CfgReportInput';

import CfgPaySlip from '@/views/cfg/CfgReport/CfgPaySlip';
import CfgSalarySlip from '@/views/cfg/CfgReport/CfgSalarySlip';
import CfgSalarySlipDetail from '@/views/cfg/CfgReport/CfgSalarySlipDetail';

import CfgLogs   from '@/views/cfg/CfgLogs';
import CfgPayConSetting from '@/views/cfg/CfgPayConSetting';

import CfgEmployeeMasterEntry from "@/views/cfg/CfgMasterCode/CfgEmployeeMasterEntry";
import CfgEmpPayMaster from "@/views/cfg/CfgMasterCode/CfgEmpPayMaster";
import CfgEmployeeMasterEntryInput from "@/views/cfg/CfgMasterCode/CfgEmployeeMasterEntryInput";
import CfgBankTransfer from "../views/cfg/CfgReport/CfgBankTransfer";
import CfgBankTransferInput from "../views/cfg/CfgReport/CfgBankTransferInput";
import PayrollDeductionCalcModal from "@/components/payroll/pay_entry/modals/PayrollDeductionCalcModal";
import PayCarryoverModal from "@/components/payroll/pay_entry/modals/PayCarryoverModal";
import PayCalculationPopup from '@/views/payroll/pay_entry/PayCalculationPopup';
import EssPayroll from "../views/ess/esspayroll/EssPayroll";
import EssSalaryhistory from "../views/ess/esspayroll/EssSalaryhistory";
import MyStatementIncomeTaxCertiRequest from "../views/ess/esswithholdingtax/MyStatementIncomeTaxCertiRequest";
import EssAccountRegistration from "../views/ess/essaccount_registration/EssAccountRegistration";
// samples
import SampleForm from '@/views/samples/SampleForm';
import SampleLayout from '@/views/samples/SampleLayout';
import SampleModal from '@/views/samples/SampleModal';
import SampleButton from '@/views/samples/SampleButton';
import SampleGrid from '@/views/samples/SampleGrid';
import SampleTab from '@/views/samples/SampleTab';
import SampleHeader from '@/views/samples/SampleHeader';
import SampleInput from '@/views/samples/SampleInput';

Vue.use(Router);

const routes = [
    {
        // 기존 JSP 개발화면은 tomcat 으로 리다이렉트 시킨다.
        path: '/auth/list',
        beforeEnter: function(to, from, next) {
            window.location.href = window.location.protocol + "//" + window.location.hostname + to.fullPath;
        }
    },
    { path: '/view/common/no-permission', name: 'noPermission', component: NoPermission },
    { path: '/view/common/not-found', name: 'notFound', component: NotFound },
    { path: '/view/common/general-error', name:'generalError', component: GeneralError },
    { path: "/", redirect: {name: 'dashboard'}, },
    { path: "/view", redirect: {name: 'dashboard'}, },
    { path: '/view/home', component: Main, redirect: {name: 'dashboard'},
        children: [
            { path: 'dashboard', name: 'dashboard', component: Dashboard },
            { path: 'timeline', name: 'timeline', component: Timeline },
            { path: 'getting-started', name: 'gettingStarted', component: GettingStarted }
        ]
    },
    { path: '/payrolldeductioncalcmodal', name: 'PayrollDeductionCalcModal', component: PayrollDeductionCalcModal },
    { path: '/paycarryovermodal', name: 'PayCarryoverModal', component: PayCarryoverModal },
    { path: '/paycalculationpopup', name: 'PayCalculationPopup', component: PayCalculationPopup },
    // 참조 샘플 화면
    { path: '/samples', component: Main, redirect: {name: 'home'},
        children: [
            { path: 'form', name: 'SampleForm', component: SampleForm },
            { path: 'layout', name: 'SampleLayout', component: SampleLayout },
            { path: 'button', name: 'SampleButton', component: SampleButton },
            { path: 'modal', name: 'SampleModal', component: SampleModal },
            { path: 'grid', name: 'SampleGrid', component: SampleGrid },
            { path: 'table', name: 'SampleTable', component: () => import('@/views/samples/SampleTable.vue') },
            { path: 'tab', name: 'SampleTab', component: SampleTab },
            { path: 'header', name: 'SampleHeader', component: SampleHeader },
            { path: 'input', name: 'SampleInput', component: SampleInput },
            { path: 'sample-page-1', name: 'SamplePage', component: SamplePage },
            { path: 'sample-page-2', name: 'SamplePage2', component: () => import('@/views/samples/SamplePageForm.vue') },
            { path: 'sample-page-3', name: 'SamplePage3', component: () => import('@/views/samples/SamplePageForm2.vue') },
            { path: 'sample-page-4', name: 'SamplePage4', component: () => import('@/views/samples/SamplePageForm3.vue') },
        ]
    },
    // 급여
    { path: '/payroll', component: Main, redirect: {name: 'home'},
        children: [
            { path: 'payday', name: 'PayDay', component: PayDay },
            { path: 'payentry', name: 'PayEntry', component: PayEntry },
            { path: 'health-employment', name: 'HealthEmployment', component: HealthEmployment },
            { path: 'health-employment-setting', name: 'HealthEmploymentSetting', component: HealthEmploymentSetting },
            /*
            {   path: 'health-employment', name: 'HealthEmployment', component: HealthEmployment,
                redirect: { name: 'HealthEmpStep1' },
                children: [
                    {
                        path: 'step1', name: 'HealthEmpStep1', component: HealthEmployment1
                    },
                    {
                        path: 'step2', name: 'HealthEmpStep2', component: HealthEmployment2
                    },
                    {
                        path: 'step3', name: 'HealthEmpStep3', component: HealthEmployment3
                    },
                ]
            }, */
            { path: 'payroll-ledger', name: 'PayrollLedger', component: PayrollLedger},
            { path: 'salary-history', name: 'SalaryHistory', component: SalaryHistory},
            { path: 'tax-ledger', name: 'TaxLedger', component: TaxLedger},
            { path: 'pay-specification', name: 'PaySpecification', component: PaySpecification},

            { path: 'payreview', name: 'PayReview', component: PayReview },
            { path: 'paycheck-report', name: 'PaycheckReport', component: PaycheckReport },

            { path: 'pay-account-verify', name: 'PayAccountVerify', component: PayAccountVerify },
            { path: 'gen-bank-transfer-file', name: 'GenBankTransferFile', component: GenBankTransferFile },
            { path: 'gen-pay-check', name: 'GenPayCheck', component: GenPayCheck },

            { path: 'earned-income-source', name: 'EarnedIncomeSource', component: EarnedIncomeSource },
            { path: 'income-tax-source', name: 'IncomeTaxSource', component: IncomeTaxSource },

            { path: 'earned-income-report', name: 'EarnedIncomeReport', component: EarnedIncomeReport },
            { path: 'resident-tax-report', name: 'ResidentTaxReport', component: ResidentTaxReport },
            { path: 'withholding-tax-report', name: 'WithholdingTaxReport', component: WithholdingTaxReport },
            { path: 'withholding-input', name: 'WithholdingInput', component: WithholdingInput },

            { path: 'total-remuneration', name: 'TotalRemuneration', component: TotalRemuneration },
            { path: 'acquisition-job', name: 'AcquisitionJob', component: AcquisitionJob },
            { path: 'loss-job', name: 'LossJob', component: LossJob },
            /*
            import TotalRemuneration from '@/views/payroll/social_insurance/TotalRemuneration';
            import AcquisitionJob from '@/views/payroll/social_insurance/AcquisitionJob';
            import LossJob from '@/views/payroll/social_insurance/LossJob';
            */

            // { path: 'paytaxreport', name: 'PayTaxReport', component: PayTaxReport},
            // { path: 'socialinsurance', name: 'SocialInsurance', component: SocialInsurance },

            { path: 'paydayopen', name: 'PayDayOpen', component: PayDayOpen },
            { path: 'subjectmanagement', name: 'SubjectManagement', component: SubjectManagement },
            { path: 'workresult', name: 'WorkResult', component: WorkResult },
            { path: 'leaveofabsence', name: 'LeaveOfAbsence', component: LeaveOfAbsence },


        ]
    },
    // 일용직 급여
    { path: '/dwork', component: Main, redirect: {name: 'home'},
        children: [
            { path: 'dworktax', name: 'DworkTax', component: DworkTax },
            { path: 'dworkpayquery', name: 'DworkPayQuery', component: DworkPayQuery },
            { path: 'dworkbank', name: 'DworkBank', component: DworkBank },
            { path: 'dworktaxreport', name: 'DworkTaxReport', component: DworkTaxReport },
        ]
    },
    // 퇴직금
    { path: '/sev', component: Main, redirect: {name: 'home'},
        children: [
            { path: 'sevpayentry', name: 'SevPayEntry', component: SevPayEntry },
            { path: 'sevpaycreate', name: 'SevPayCreate', component: SevPayCreate},
            { path: 'sevpaydelete', name: 'SevPayDelete', component: SevPayDelete},
            { path: 'sevpayavg', name: 'SevPayAvg', component: SevPayAvg},
            { path: 'sevpayexe', name: 'SevPayExe', component: SevPayExe},
            { path: 'sevpaydaybet', name: 'SevPayDayBet', component: SevPayDayBet},
            { path: 'sevpaycalc', name: 'SevPayCalc', component: SevPayCalc},
            { path: 'sevtax', name: 'SevTax', component: SevTax },
            { path: 'sevpension', name: 'SevPension', component: SevPension },
            { path: 'sevpensionmattermgt', name: 'SevPensionMatterMgt', component: SevPensionMatterMgt},
            { path: 'sevpensioncalc', name: 'SevPensionCalc', component: SevPensionCalc},
            { path: 'sevpensioncalcresultavg', name: 'SevPensionCalcResultAvg', component: SevPensionCalcResultAvg},
            { path: 'sevpensioncalcresultcal', name: 'SevPensionCalcResultCal', component: SevPensionCalcResultCal},
            { path: 'sevpensioncalcresultten', name: 'SevPensionCalcResultTen', component: SevPensionCalcResultTen},

            { path: 'sevpensioncalcmgt', name: 'SevPensionCalcMgt', component: SevPensionCalcMgt},
            { path: 'sevpensioncalcdelete', name: 'SevPensionCalcDelete', component: SevPensionCalcDelete},
            { path: 'sevpensionsaving', name: 'SevPensionSaving', component: SevPensionSaving},
            { path: 'sevpensionsavingsearch', name: 'SevPensionSavingSearch', component: SevPensionSavingSearch},
            { path: 'sevpayquery', name: 'SevPayQuery', component: SevPayQuery },
            { path: 'sevpayqueryavg', name: 'SevPayQueryAvg', component: SevPayQueryAvg },
            { path: 'sevpayquerycalc', name: 'SevPayQueryCalc', component: SevPayQueryCalc },
            { path: 'sevpayquerydaybet', name: 'SevPayQueryDayBet', component: SevPayQueryDayBet },
            { path: 'sevpayqueryexe', name: 'SevPayQueryExe', component: SevPayQueryExe },
            { path: 'sevpayqueryper', name: 'SevPayQueryPer', component: SevPayQueryPer },
            { path: 'sevpayquerytax', name: 'SevPayQueryTax', component: SevPayQueryTax },
            { path: 'sevpensionquery', name: 'SevPensionQuery', component: SevPensionQuery},
            { path: 'sevpensionqueryavg', name: 'SevPensionQueryAvg', component: SevPensionQueryAvg},
            { path: 'sevpensionquerypen', name: 'SevPensionQueryPen', component: SevPensionQueryPen},
            { path: 'sevpensionquerycal', name: 'SevPensionQueryCal', component: SevPensionQueryCal},
            { path: 'sevfile', name: 'SevFile', component: SevFile },
            { path: 'sevtaxfile', name: 'SevTaxFile', component: SevTaxFile },
            { path: 'sevtaxreport', name: 'SevTaxReport', component: SevTaxReport },
        ]
    },
    // 연말정산
    { path: '/yearend', component: Main, redirect: {name: 'home'},
        children: [
            { path: 'yedate', name: 'YeDate', component: () => import('@/views/yearend/schedule/YeDate.vue') },
            { path: 'yereceiptopen', name: 'YeReceiptOpen', component: () => import('@/views/yearend/schedule/YeReceiptOpen.vue')},
            { path: 'yeresulttaxdate', name: 'YeResultTaxDate', component: () => import('@/views/yearend/schedule/YeResultTaxDate.vue')},
            { path: 'yesettleschedule', name: 'YeSettleSchedule', component: () => import('@/views/yearend/schedule/YeSettleSchedule.vue')},
            { path: 'yesettleyear', name: 'YeSettleYear', component: () => import('@/views/yearend/schedule/YeSettleYear.vue')},
            { path: 'yesalary', name: 'YeSalary', component: () => import('@/views/yearend/salary/YeSalary.vue')},
            { path: 'yeretiresalary', name: 'YeRetireSalary', component: () => import('@/views/yearend/salary/YeRetireSalary.vue')},
            { path: 'yesalary13month', name: 'YeSalary13Month', component: () => import('@/views/yearend/salary/YeSalary13Month.vue')},
            { path: 'settlement', name: 'YeSettlement', component: () => import('@/views/yearend/settle/YeSettlement.vue')},
            { path: 'yesettlebase', name: 'YeSettleBase', component: () => import('@/views/yearend/settle/YeSettleBase.vue'),
                redirect: {name: 'YeBasics'},
                children: [
                    {
                        path: 'yebasics',
                        name: 'YeBasics',
                        component: () => import('@/views/yearend/settle/YeBasics.vue')
                    },
                    {
                        path: 'yeannualincome', //연소득
                        name: 'YeAnnualIncome',
                        component: () => import('@/views/yearend/settle/YeAnnualIncome.vue'),
                        redirect: { name: 'YeAnnualIncomeDetail', params: {id: 0, WORK_SEQ_NO: 1} },
                        children: [
                            {   path: 'detail/:id/:WORK_SEQ_NO', name: 'YeAnnualIncomeDetail',
                                component: () => import('@/views/yearend/settle/annual_income/Detail.vue')
                            }
                        ]
                    },
                    {
                        path: 'yedependents',
                        name: 'YeDependents',
                        component: () => import('@/views/yearend/settle/YeDependents.vue')
                    },
                    {
                        path: 'yenationalfile',
                        name: 'YeNationalFile',
                        component: () => import('@/views/yearend/settle/YeNationalFile.vue')
                    },
                    {
                        path: 'yededucteditem1',
                        name: 'YeDeductedItem1',
                        component: () => import('@/views/yearend/settle/YeDeductedItem1.vue'),
                        redirect: { name: 'InsuranceFee' },
                        children: [
                            {path: 'insurancefee', name: 'InsuranceFee', component: () => import('@/views/yearend/settle/deducted_item1/InsuranceFee.vue')},
                            {path: 'medicalexpense', name: 'MedicalExpense', component: () => import('@/views/yearend/settle/deducted_item1/MedicalExpense.vue')},
                            {path: 'educationalexpense', name: 'EducationalExpense', component: () => import('@/views/yearend/settle/deducted_item1/EducationalExpense.vue')},
                            {path: 'creditcard', name: 'CreditCard', component: () => import('@/views/yearend/settle/deducted_item1/CreditCard.vue')},
                            {path: 'donation', name: 'Donation', component: () => import('@/views/yearend/settle/deducted_item1/Donation.vue')},
                        ]
                    },
                    {
                        path: 'yededucteditem2',
                        name: 'YeDeductedItem2',
                        component: () => import('@/views/yearend/settle/YeDeductedItem2.vue'),
                        redirect: { name: 'PensionSaving' },
                        children: [
                            {path: 'pensionsaving', name: 'PensionSaving', component: () => import('@/views/yearend/settle/deducted_item2/PensionSaving.vue')},
                            {path: 'homerental', name: 'HomeRental', component: () => import('@/views/yearend/settle/deducted_item2/HomeRental.vue')},
                            {path: 'housingmortgage', name: 'HousingMortgage', component: () => import('@/views/yearend/settle/deducted_item2/HousingMortgage.vue')},
                            {path: 'housingsaving', name: 'HousingSaving', component: () => import('@/views/yearend/settle/deducted_item2/HousingSaving.vue')},
                            {path: 'monthlyrent', name: 'MonthlyRent', component: () => import('@/views/yearend/settle/deducted_item2/MonthlyRent.vue')},
                            {path: 'extra', name: 'Extra', component: () => import('@/views/yearend/settle/deducted_item2/Extra.vue')},
                            {path: 'foreigntax', name: 'ForeignTax', component: () => import('@/views/yearend/settle/deducted_item2/ForeignTax.vue')},
                        ]
                    },
                    {
                        path: 'yeprooflist',
                        name: 'YeProoflist',
                        component: () => import('@/views/yearend/settle/YeProoflist.vue')
                    },
                    {
                        path: 'yesettlementdetails',
                        name: 'YeSettlementDetails',
                        component: () => import('@/views/yearend/settle/YeSettlementDetails.vue')
                    },
                ]
            },
            { path: 'yeaftermail', name: 'YeAfterMail', component:  () => import('@/views/yearend/after/YeAfterMail.vue')}, //서류미비자 안내메일 발송
            { path: 'yeaftertext', name: 'YeAfterText', component:  () => import('@/views/yearend/after/YeAfterText.vue')}, //서류미비자 안내문자 발송
            { path: 'yeaftertaxpay', name: 'YeAfterTaxPay', component: () => import('@/views/yearend/after/YeAfterTaxPay.vue')}, //정산세액 급여대장반영

            { path: 'yesettlequery', name: 'YeSettleQuery', component:() => import('@/views/yearend/query/YeSettleQuery.vue')},

            { path: 'yeextrafile', name: 'YeExtraFile', component: () => import('@/views/yearend/taxfile/YeExtraFile.vue') },
            { path: 'yetaxfile', name: 'YeTaxFile', component: () => import('@/views/yearend/taxfile/YeTaxFile.vue') },

            { path: 'yetaxreport', name: 'YeTaxReport', component: () => import('@/views/yearend/ntsreport/YeTaxReport.vue') },
            { path: 'yetaxincomereport', name: 'YeTaxIncomeReport', component: () => import('@/views/yearend/ntsreport/YeTaxIncomeReport.vue') },

            // 연말정산실행 temp routes
            { path: 'currentwork', name: 'CurrentWork', component: () => import('@/views/yearend/settle/CurrentWork.vue')},
            { path: 'prevwork', name: 'PrevWork', component: () => import('@/views/yearend/settle/PrevWork.vue')}
        ]
    },
    // 사업소득
    { path: '/bizinc', component: Main, redirect: {name: 'home'},
        children: [
            { path: 'bizincearner', name: 'BizincEarner', component: BizincEarner },
            { path: 'bizincincome', name: 'BizincIncome', component: BizincIncome },
            { path: 'bizincincomequery', name: 'BizincIncomeQuery', component: BizincIncomeQuery },
            { path: 'bizincincomereport', name: 'BizincIncomeReport', component: BizincIncomeReport },
            { path: 'bizincotherinc', name: 'BizincOtherInc', component: BizincOtherInc },
            { path: 'bizincotherquery', name: 'BizincOtherQuery', component: BizincOtherQuery },
            { path: 'bizincotherreport', name: 'BizincOtherReport', component: BizincOtherReport },
            { path: 'bizincinterest', name: 'BizincInterest', component: BizincInterest },
            { path: 'bizincnonresid', name: 'BizincNonResid', component: BizincNonResid },
            { path: 'bizincnonresidquery', name: 'BizincNonResidQuery', component: BizincNonResidQuery },
            { path: 'bizincnonresidreport', name: 'BizincNonResidReport', component: BizincNonResidReport},
            { path: 'bizincvirtualasset', name: 'BizincVirtualAsset', component: BizincVirtualAsset},
            { path: 'bizincvirtualassetquery', name: 'BizincVirtualAssetQuery', component: BizincVirtualAssetQuery},
            { path: 'bizincVirtualAssetReport', name: 'BizincVirtualAssetReport', component: BizincVirtualAssetReport},
            { path: 'bizinctaxreport', name: 'BizincTaxReport', component: BizincTaxReport },
            { path: 'bizinctaxsimplereport', name: 'BizincTaxSimpleReport', component: BizincTaxSimpleReport },
        ]
    },
    // 환경설정
    { path: '/cfg', component: Main, redirect: {name: 'home'},
        children: [
            { path: 'cfgcode', name: 'CfgCode', component: CfgCode },
            { path: 'cfgyearsalary', name: 'CfgYearSalary', component: CfgYearSalary },
            { path: 'cfgmastercode', name: 'CfgMasterCode', component: CfgMasterCode },
            { path: 'cfghobongtable', name: 'CfgHobongTable', component: CfgHobongTable },

            { path: 'cfghobongpaymaster', name: 'CfgHobongPayMaster', component: CfgHobongPayMaster },

            { path: 'cfgannualsalarytable', name: 'CfgAnnualSalaryTable', component: CfgAnnualSalaryTable },
            
            { path: 'cfgannualsalarypaymaster', name: 'CfgAnnualSalaryPayMaster', component: CfgAnnualSalaryPayMaster },

            { path: 'cfgemployeemasterentry', name: 'CfgEmployeeMasterEntry', component: CfgEmployeeMasterEntry},
            { path: 'cfgemployeemasterentryinput', name: 'CfgEmployeeMasterEntryInput', component: CfgEmployeeMasterEntryInput},
            { path: 'cfgemppaymaster', name: 'CfgEmpPayMaster', component: CfgEmpPayMaster},
            { path: 'cfgovertimecode', name: 'CfgOvertimeCode', component: CfgOvertimeCode},
            { path: 'cfgcalc', name: 'CfgCalc', component: CfgCalc },

            { path: 'cfgcalcinput', name: 'CfgCalcInput', component: CfgCalcInput },

            { path: 'cfgovertimecalc', name: 'CfgOverTimeCalc', component: CfgOverTimeCalc },
            
            { path: 'cfgretirecalc', name: 'CfgRetireCalc', component: CfgRetireCalc },
            { path: 'cfgretirecalcinput', name: 'CfgRetireCalcInput', component: CfgRetireCalcInput },

            { path: 'cfgreport', name: 'CfgReport', component: CfgReport },
            { path: 'cfgreportinput', name: 'CfgReportInput', component: CfgReportInput },

            { path: 'cfgpayslip', name: 'CfgPaySlip', component: CfgPaySlip },
            { path: 'cfgsalaryslip', name: 'CfgSalarySlip', component: CfgSalarySlip },
            { path: 'cfgsalaryslipdetail', name: 'CfgSalarySlipDetail', component: CfgSalarySlipDetail },

            { path: 'cfglogs', name: 'CfgLogs', component: CfgLogs },
            { path: 'cfgpayconsetting', name: 'CfgPayConSetting', component: CfgPayConSetting },
            { path: 'cfgbanktransfer', name: 'CfgBankTransfer', component: CfgBankTransfer },
            { path: 'cfgbanktransferinput', name: 'CfgBankTransferInput', component: CfgBankTransferInput },
        ]
    },
    // 시스템
    { path: '/system', component: Main, redirect: {name: 'home'},
        children: [
            { path: 'systembase', name: 'SystemBase', component: () => import('@/views/system/SystemBase.vue') },
            { path: 'systemcode', name: 'SystemCode', component: () => import('@/views/system/SystemCode.vue') },
            { path: 'systembank', name: 'SystemBankCode', component: () => import('@/views/system/SystemBankCode.vue'), },
            { path: 'systemtaxagent', name: 'SystemTaxOfficeCode', component: () => import('@/views/system/SystemTaxOfficeCode.vue'), },
            { path: 'systemarea', name: 'SystemAreaCode', component: () => import('@/views/system/SystemAreaCode.vue'), },
            { path: 'systemtax', name: 'SystemTax', component: () => import('@/views/system/SystemTax.vue'), },
            { path: 'systeminsrate', name: 'SystemInsRate', component: () => import('@/views/system/SystemTaxInsRate.vue'), },
            { path: 'systemtaxtitle', name: 'SystemTaxTitle', component: () => import('@/views/system/SystemTaxTitle.vue'), },
            { path: 'systemtaxtitlelimit', name: 'SystemTaxTitleLimit', component: () => import('@/views/system/SystemTaxTitleLimit.vue'), },
            { path: 'mastercode', name: 'mastercode', component: () => import('@/views/system/MasterCode.vue') },
            { path: 'systemyearend', name: 'SystemYearend', component: () => import('@/views/system/SystemYearend.vue') },
        ]
    },
// ess
    { path: '/ess', component: Main, redirect: {name: 'home'},
        children: [
            { path: 'esspayroll', name: 'EssPayroll', component: EssPayroll },
            { path: 'esssalaryhistory', name: 'EssSalaryhistory', component: EssSalaryhistory },
            { path: 'mystatementincometaxcertirequest', name: 'MyStatementIncomeTaxCertiRequest', component: MyStatementIncomeTaxCertiRequest },
            { path: 'essaccountregistration', name: 'EssAccountRegistration', component: EssAccountRegistration },

        ]
    },
    // 404 page must be placed at the end !!!
    {
        path: '*',
        component: NotFound
    }
    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ "../views/About.vue"),
    // },

];

const createRouter = () => new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    base: process.env.BASE_URL,
    routes,
})

const router = createRouter()

// router interceptor 개념
router.beforeEach(async (to, from, next) => {
    // if (to.path !== '/no-permission') {
    //
    //     // 토큰이 없는 경우
    //     if (!store.state.auth.csrf.token) {
    //         await router.push("/no-permission")
    //     }
    //
    //     store.commit('page/setCurrentView', to.path); // 현재 페이지 경로 저장
    // }

    next();
})

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router;