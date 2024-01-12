import Image from "next/image";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import CategoryLabel from "../Blog/category";
import { PhotoSizeSelectLargeOutlined } from "@mui/icons-material";
import { cx } from "../../utils/all";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight,
}: any) {
  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-10 md:grid-cols-2",
        )}
      >
        <div
          className={cx(
            " overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105   dark:bg-gray-800",
          )}
        >
          <Link
            className={cx(
              "relative block",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                  ? "aspect-[5/4]"
                  : "aspect-square",
            )}
            href={`/post/${post?.title}`}
          >
            {post?.featuredImage ? (
              //   <Image
              //     src={post?.featuredImage}
              //     {...(post?.mainImage?.blurDataURL && {
              //       placeholder: "blur",
              //       blurDataURL: post?.mainImage?.blurDataURL,
              //     })}
              //     alt={post?.mainImage?.alt || "Thumbnail"}
              //     priority={preloadImage ? true : false}
              //     className="object-cover transition-all"
              //     fill
              //     sizes="(max-width: 768px) 30vw, 33vw"
              //   />
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img
                src={post?.featuredImage}
                sizes="(max-width: 768px) 30vw, 33vw"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoSizeSelectLargeOutlined />
              </span>
            )}
          </Link>
        </div>

        <div className={cx(minimal && "flex items-center")}>
          <div>
            <CategoryLabel categories={post.categories} nomargin={minimal} />
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-2xl"
                  : minimal
                    ? "text-3xl"
                    : "text-lg",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium  tracking-normal text-black"
                  : "font-semibold leading-snug tracking-tight",
                "mt-2    dark:text-white",
              )}
            >
              <Link href={`/post/${post?.title}`}>
                <span
                  className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
      bg-no-repeat
      transition-[background-size]
      duration-500
      hover:bg-[length:100%_3px]
      group-hover:bg-[length:100%_10px]
      dark:from-purple-800 dark:to-purple-900"
                >
                  {post.title}
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  <Link href={`/post/${post?.title}`}>{post.excerpt}</Link>
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <Link href={`/author/${post?.author?.slug?.current}`}>
                <div className="flex items-center gap-3">
                  <div className="relative h-5 w-5 flex-shrink-0">
                    {post?.author?.image && (
                      <Image
                        src={
                          post?.author?.image?.featuredImage ||
                          "/images/profile/user-1.jpg"
                        }
                        alt={post?.author?.name}
                        className="rounded-full object-cover"
                        fill
                        sizes="20px"
                      />
                    )}
                  </div>
                  <span className="truncate text-sm">{post?.author?.name}</span>
                </div>
              </Link>
              <span className="text-xs text-gray-300 dark:text-gray-600">
                &bull;
              </span>
              <time
                className="truncate text-sm"
                dateTime={post?.publishedAt || post._createdAt}
              >
                {post?.publishedAt ||
                  (post.createdAt &&
                    format(
                      parseISO(post?.publishedAt || post.createdAt),
                      "MMMM dd, yyyy",
                    ))}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
