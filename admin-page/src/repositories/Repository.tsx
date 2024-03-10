export const TasksRepository = {
    //GrapiQl
    callApiHomepageGetAll: (type: string) => {
        let path = '/homepage/getall?orgId=' + document['user']['OrgId'] + '&type=' + type;
        // return Utils.api_call_get(apiId, path)
    }
}