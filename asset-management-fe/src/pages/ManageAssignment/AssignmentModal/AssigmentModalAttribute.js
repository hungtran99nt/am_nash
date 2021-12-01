import {sortCode} from "../../../common/config";

export const userColumns = [
    {
        dataField: 'staffCode',
        text: 'Staff code',
        sort: true,
        width: '',
        sortFunc: (a, b, order) => {
            return sortCode(a, b, order);
        },
        headerStyle: () => {
            return {width: '130px'};
        }
    }, {
        dataField: 'fullName',
        text: 'Full name',
        sort: true
    }, {
        dataField: 'type',
        text: 'Type',
        sort: true,
        headerStyle: () => {
            return {width: '80px'};
        }
    }
];

export const assetColumns = [
    {
        dataField: 'assetCode',
        text: 'Asset code',
        sort: true,
        width: '',
        sortFunc: (a, b, order) => {
            return sortCode(a, b, order);
        },
        headerStyle: () => {
            return {width: '130px'};
        }
    }, {
        dataField: 'assetName',
        text: 'Asset name',
        sort: true
    }, {
        dataField: 'categoryName',
        text: 'Category',
        sort: true,
        headerStyle: () => {
            return {width: '110px'};
        }
    }
];
