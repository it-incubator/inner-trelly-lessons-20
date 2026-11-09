import { setAppErrorAC } from "@/app/app-slice"
import { isErrorWithDetail } from "./isErrorWithDetail"
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query/react"

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  let error = "Some error occurred"
  
  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
      case "TIMEOUT_ERROR":
        error = result.error.error
        break
      default:
        if (result.error.status >= 500 && result.error.status < 600) {
          error = "Server error occurred. Please try again later."
        } else if (isErrorWithDetail(result.error.data)) {
          error = result.error.data.errors[0].detail
        } else {
          error = JSON.stringify(result.error)
        }
        break
    }
    api.dispatch(setAppErrorAC({ error }))
  }
}
