export function isErrorWithDetail(error: unknown): error is { errors: { detail: string }[] } {
  return (
    typeof error === "object" && // Проверяем, что error – это объект
    error != null && // Убеждаемся, что это не null
    "errors" in error && // Проверяем, что у объекта есть свойство 'errors'
    Array.isArray(error.errors) // Убеждаемся, что 'errors' это массив
  )
}
