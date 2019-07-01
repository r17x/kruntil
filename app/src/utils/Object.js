/**
 * Compare 2 JSON Object
 * @params {object} x
 * @params {object} y
 * @return {bool}
 *
 * This function for simple json object compare
 * you can't compare specific JSON like NODE Or
 * Dom Object in JSON-Data.
 */
export const Equals = (x, y) => JSON.stringify(x) === JSON.stringify(y)

/**
 * @params {array} arrs
 * @params {string} prop as properties
 * @return {boolean} true or false
 */
export const uniqueArrayObject = (arrs, prop) =>
  arrs.filter(
    (obj, pos, arr) =>
      arr
        .map(mapObj => getByProp(mapObj, prop))
        .indexOf(getByProp(obj, prop)) === pos,
  )

/**
 * @param {object} obj - to find value in this object
 * @param {string} prop - property name in obj
 * @return {any} - value in object by property name
 */
export const getByProp = (obj, prop) =>
  typeof prop === 'string'
    ? prop.split('.').reduce((acc, cur, idx) => acc[cur], obj)
    : obj
