import React, { useCallback } from "react";
import appwriteService from "../../Appwrite/config";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import Button from "../Button";

const Postform = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post.title || "",
        slug: post.slug || "",
        content: post.content,
        status: post.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.uplodFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        const file = appwriteService.uplodFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await appwriteService.client({
            ...data,
            userId: userData.$id,
          });
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    }
  };
  const sulgTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-");
    }
    return "";
  }, []);
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", sulgTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, sulgTransform, setValue]);
  return (
    <form action="" onSubmit={handleSubmit(submit)} className=" flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="title"
          placeholder="title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="slug"
          className="mb-4"
          {...register("title", { required: true })}
          onInput={(e) => {
            setValue("slug", sulgTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          placeholder=""
          className="mb-4"
          {...register("image", { required: !post })}
          accept=""
        />
        {post && (
          <div className=" w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className=" rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className=" mb-4 "
          {...register("status", { required: true })}
        />
        <Button
          className="w-full "
          type="submit"
          bgcolor={post ? "bg-green-500" : undefined}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default Postform;
