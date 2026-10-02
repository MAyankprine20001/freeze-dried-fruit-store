import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { STATIC_ROUTE_META, isNoindexPath, setPageMeta } from "../utils/seo";

/**
 * Sets page metadata on every route change.
 * Product pages refine their own title/description once the product loads.
 */
export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

    if (isNoindexPath(path)) {
      setPageMeta({ noindex: true });
    } else if (STATIC_ROUTE_META[path]) {
      setPageMeta({ ...STATIC_ROUTE_META[path], path });
    } else if (/^\/product\/[^/]+$/.test(path)) {
      setPageMeta({ path });
    } else {
      // Unknown route: rendered by NotFound, keep it out of the index.
      setPageMeta({ title: "Page Not Found", noindex: true });
    }
  }, [pathname]);

  return null;
}
