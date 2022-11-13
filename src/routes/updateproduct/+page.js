
// get url params and return so the are available in the page
export const load = async ({ params, url }) => {
    let lang = url.searchParams.get('lang');
    let id = url.searchParams.get('id');
  return { lang, id };
}