import create from 'zustand';
import p from 'immer';
import { set as objectSet } from 'lodash';
import * as API from '@/services/hello';

const defaultState = {
  data: [
    {
      id: '1493517539916754945',
      createUser: '1481824496424894465',
      createDept: '1387636581268033537',
      createTime: '2022-02-15 17:28:24',
      updateUser: '1481824496424894465',
      updateTime: '2022-02-15 17:28:24',
      isDeleted: 0,
      code: 'host',
      name: '主机类型',
      description: '',
      tenantId: '000000',
    },
    {
      id: '1493519631096066049',
      createUser: '1123598821738675201',
      createDept: '1123598813738675201',
      createTime: '2022-02-15 17:36:43',
      updateUser: '1123598821738675201',
      updateTime: '2022-02-15 17:36:43',
      isDeleted: 0,
      code: 'ci_state',
      name: 'CI状态',
      description: '描述CI状态',
      tenantId: '000000',
    },
    {
      id: '1493520556359528449',
      createUser: '1123598821738675201',
      createDept: '1123598813738675201',
      createTime: '2022-02-15 17:40:24',
      updateUser: '1123598821738675201',
      updateTime: '2022-02-15 17:40:24',
      isDeleted: 0,
      code: 'company',
      name: '所属单位',
      description: '',
      tenantId: '000000',
    },
    {
      id: '1493521341482905602',
      createUser: '1123598821738675201',
      createDept: '1123598813738675201',
      createTime: '2022-02-15 17:43:31',
      updateUser: '1123598821738675201',
      updateTime: '2022-02-15 17:43:31',
      isDeleted: 0,
      code: 'department',
      name: '所属部门',
      description: '',
      tenantId: '000000',
    },
    {
      id: '1493523521891840002',
      createUser: '1123598821738675201',
      createDept: '1123598813738675201',
      createTime: '2022-02-15 17:52:11',
      updateUser: '1123598821738675201',
      updateTime: '2022-02-15 17:52:11',
      isDeleted: 0,
      code: 'maintenance_level',
      name: '维保等级',
      description: '',
      tenantId: '000000',
    },
    {
      id: '1493528689618300929',
      createUser: '1123598821738675201',
      createDept: '1123598813738675201',
      createTime: '2022-02-15 18:12:43',
      updateUser: '1123598821738675201',
      updateTime: '2022-02-15 18:12:43',
      isDeleted: 0,
      code: 'sex',
      name: '性别',
      description: '',
      tenantId: '000000',
    },
    {
      id: '1493530474311430146',
      createUser: '1123598821738675201',
      createDept: '1123598813738675201',
      createTime: '2022-02-15 18:19:48',
      updateUser: '1123598821738675201',
      updateTime: '2022-02-15 18:19:48',
      isDeleted: 0,
      code: 'services_attribute',
      name: '业务类型',
      description: '',
      tenantId: '000000',
    },
    {
      id: '1494123321860603906',
      createUser: '1123598821738675201',
      createDept: '1123598813738675201',
      createTime: '2022-02-17 09:35:34',
      updateUser: '1123598821738675201',
      updateTime: '2022-02-17 09:35:34',
      isDeleted: 0,
      code: 'owner',
      name: '责任人',
      description: '责任人',
      tenantId: '000000',
    },
    {
      id: '1494125331758497793',
      createUser: '1123598821738675201',
      createDept: '1123598813738675201',
      createTime: '2022-02-17 09:43:33',
      updateUser: '1123598821738675201',
      updateTime: '2022-02-17 09:43:33',
      isDeleted: 0,
      code: 'provider_contact',
      name: '供应商联系人',
      description: '供应商联系人',
      tenantId: '000000',
    },
    {
      id: '1494125566534664193',
      createUser: '1123598821738675201',
      createDept: '1123598813738675201',
      createTime: '2022-02-17 09:44:29',
      updateUser: '1123598821738675201',
      updateTime: '2022-02-17 09:44:29',
      isDeleted: 0,
      code: 'maintenance_contact',
      name: '维保联系人',
      description: '维保联系人',
      tenantId: '000000',
    },
  ],
};

export default create((set, get) => ({
  ...defaultState,
  actions: {
    setState(key, value) {
      if (typeof key === 'string') {
        if (key.indexOf('.') !== -1 || key.indexOf('[') !== -1) {
          set(
            p((state) => {
              objectSet(state, key, value);
            }),
          );
        } else {
          set({
            [key]: value,
          });
        }
      } else if (typeof key === 'function') {
        set(
          p((state) => {
            key(state);
          }),
        );
      } else if (
        Object.prototype.toString.call(key) === '[object Object]' &&
        !value
      ) {
        set(key);
      }
    },
    clearState() {
      set({
        ...defaultState,
      });
    },
    async fetchData() {
      let res = await API.relationList();
    },
  },
}));
