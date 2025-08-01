import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({ keyword = '', pageNumber = '' })=>({
                url:PRODUCTS_URL,
                params:{ keyword, pageNumber }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        createProduct:builder.mutation({
            query:(data)=>({
                method:'POST',
                body:data,
                url: PRODUCTS_URL
            })
        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}`,
                method:'PUT',
                body:data
            })

        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                method:'DELETE',
                url:`${PRODUCTS_URL}/${productId}`

            })

        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`

            }),
            keepUnusedDataFor: 5,
        }),
        uploadProductImage:builder.mutation({
            query:(data)=>({
                url: `/api/upload`,
                method: 'POST',
                body: data,
            })
        }),
        getTopProducts:builder.query({
            query:()=>`${PRODUCTS_URL}/top`,
            keepUnusedDataFor: 5,

        }),
        createReview:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}/reviews`,
                method:'POST',
                body:data
            })
        })

        
    })

})


export const { useGetProductsQuery,useGetProductDetailsQuery, useCreateProductMutation,useDeleteProductMutation,useUploadProductImageMutation,useUpdateProductMutation,useGetTopProductsQuery,useCreateReviewMutation} = productApiSlice;

