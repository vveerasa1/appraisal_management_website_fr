import { DESIGNATION_ENDPOINTS } from "../../../constants/endpoints";
import { createCustomApi } from "../../api";

export const designationApi = createCustomApi(
    'designationApi',
    (builder) => ({
        getDesignations: builder.query({
            query: () => ({
                url: `${DESIGNATION_ENDPOINTS.ROOT}`,
                method: 'GET',
            }),
        }),
        addDesignation: builder.mutation({
            query: (designation) => ({
                url: '/designations',
                method: 'POST',
                data: designation,
            }),
        }),
    })
)

export const {
    useGetDesignationsQuery,
    useAddDesignationMutation
} = designationApi;