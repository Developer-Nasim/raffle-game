// ✅ inventory-form.tsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { uploadImageToFirebase } from "../../../../service/uploadImage";

interface UploadedFile {
  url: string;
}

export interface FormData {
  id?: string;
  prizeName: string;
  ticketSold: number;
  price: number;
  partner: string;
  stockLevel: string;
  status: string;
  thumbnail?: string | null;
}

interface InventoryFormProps {
  formHeading: string;
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
}

const validationSchema = yup.object().shape({
  prizeName: yup.string().required("Prize Name is required"),
  ticketSold: yup.number().typeError("Ticket Sold must be a number").required("Ticket Sold is required"),
  price: yup.number().typeError("Price must be a number").required("Price is required"),
  partner: yup.string().required("Partner is required"),
  stockLevel: yup.string().required("Stock Level is required"),
  status: yup.string().required("Status is required"),
});

const InventoryForm: React.FC<InventoryFormProps> = ({
  formHeading,
  initialData,
  onSubmit,
}) => {
  const [file, setFile] = useState<UploadedFile | null>(
    initialData?.thumbnail ? { url: initialData.thumbnail } : null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialData || {},
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) {
      setSelectedFile(selected);
      setFile({ url: URL.createObjectURL(selected) });
    }
  };

  const removeFile = () => {
    setFile(null);
    setSelectedFile(null);
  };

  const handleFormSubmit = async (data: FormData) => {
    let uploadedUrl = null;
    if (selectedFile) {
      uploadedUrl = await uploadImageToFirebase(selectedFile); // ✅ Firebase URL
    }

    const newData = {
      ...data,
      thumbnail: uploadedUrl || null,
    };

    onSubmit(newData);
    reset();
    setFile(null);
    setSelectedFile(null);
  };

  return (
    <div className="border border-[#D0D5DD] rounded-xl p-6 bg-white w-full">
      <h2 className="text-[18px] font-semibold text-dark mb-8">{formHeading}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {/* Fields remain unchanged */}

          <div className="form-group">
            <label htmlFor="prizeName">Prize Name</label>
            <input className="form-control" type="text" id="prizeName" placeholder="Prize Name" {...register("prizeName")} />
            {errors.prizeName && <p className="text-red-500 text-sm">{errors.prizeName.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="ticketSold">Ticket Sold</label>
            <input className="form-control" type="number" id="ticketSold" placeholder="Ticket Sold" {...register("ticketSold")} />
            {errors.ticketSold && <p className="text-red-500 text-sm">{errors.ticketSold.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <div className="relative">
              <Image className="absolute top-[50%] translate-y-[-50%] left-3" alt="icon" height={20} width={20} src="/images/icon/currency-dollar.png" />
              <input className="form-control pl-8" type="number" id="price" placeholder="Price" {...register("price")} />
            </div>
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="partner">Partner</label> 
            <select id="partner" className="form-control" {...register("partner")}>
              <option value="">Approved Partners List </option>
              <option value="Akram">Akram</option>
              <option value="Jhon">Jhon</option> 
            </select> 
            {errors.partner && <p className="text-red-500 text-sm">{errors.partner.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="stockLevel">Stock Level</label>
            <select id="stockLevel" className="form-control" {...register("stockLevel")}>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="70">70</option>
              <option value="90">90</option>
            </select>
            {errors.stockLevel && <p className="text-red-500 text-sm">{errors.stockLevel.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" className="form-control" {...register("status")}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="ticketDescription">Description</label>
            <input className="form-control" type="text" id="ticketDescription" placeholder="Description..." />
            {/* {errors.ticketSold && <p className="text-red-500 text-sm">{errors.ticketSold.message}</p>} */}
          </div>

          <div className="form-group">  </div>

          <div className="form-group filter-adding-form">
            <h5>MAKE FILTERS SECTION (see Video)</h5>
            <label htmlFor="ticketFilters">Filters</label>
            <div className="filter-inputs">
              <div>
                <span>Colors</span>
                <select className="form-control">
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Red">Red</option>
                  <option value="Gray">Gray</option>
                  <option value="Blue">Blue</option>
                  <option value="Silver">Silver</option>
                  <option value="Golden">Golden</option>
                </select>
              </div> 
              <div>
                <span>Size</span>
                <select className="form-control">
                  <option value="S">S</option>
                  <option value="SM">SM</option>
                  <option value="M">M</option> 
                </select>
              </div> 
              <div>
                <span>Storage</span>
                <select className="form-control">
                  <option value="128">128</option>
                  <option value="256">256</option>
                  <option value="528">528</option> 
                  <option value="1TB">1TB</option> 
                </select>
              </div> 
            </div>
            {/* {errors.ticketSold && <p className="text-red-500 text-sm">{errors.ticketSold.message}</p>} */}
          </div>



          {/* Thumbnail Upload */}
          <div className="form-group col-span-2">
            <div className="form-control relative flex flex-col items-center justify-center">
              <div className="absolute left-4 top-[50%] translate-y-[-50%]">
                {file ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      src={file.url}
                      width={150}
                      height={80}
                      alt="Uploaded file"
                      className="w-[140px] h-[110px] object-cover rounded"
                    />
                    <button
                      onClick={removeFile}
                      type="button"
                      className="absolute top-2 right-2 bg-white text-gray-700 rounded-full shadow h-5 w-5 hover:bg-gray-100"
                      aria-label="Remove file"
                    >
                      ✕
                    </button>
                    <p className="text-[8px] text-white mt-2 bg-[#00000033] absolute bottom-0 left-0 w-full text-center">
                      Current Thumbnail
                    </p>
                  </div>
                ) : (
                  <Image
                    src="/images/thumb.png"
                    alt="photo"
                    height={80}
                    width={135}
                    className="w-[140px] h-[110px] object-fill rounded"
                  />
                )}
              </div>
              <label htmlFor="file-upload" className="cursor-pointer !flex flex-col justify-center items-center text-center">
                <Image src="/images/icon/upload-icon.png" alt="icon" height={40} width={40} />
                <span className="mt-3 text-sm font-normal text-gray block">
                  <strong className="text-primary font-semibold">Click to upload </strong>
                  or drag and drop
                </span>
                <span className="text-gray-500 text-sm text-center mt-2">
                  SVG, PNG, JPG, or GIF (max: 800x400px)
                </span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
              </label>
            </div>
          </div>
        </div>



        <div className="flex justify-end items-center gap-4 mt-6">
          <Link
            href="./"
            className="inline-flex items-center gap-4 px-4 py-3 bg-white text-dark border border-[#E4E7EC] rounded-lg text-sm font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-block px-4 py-3 bg-primary text-white rounded-lg text-sm font-medium"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;