"use client";
import { useState, useRef } from "react";
import { X, Upload, FileText, Loader2, Check, AlertCircle } from "lucide-react";
import { useUploadMomentsImage } from "@/app/hooks/momentHooks";

export const StatusModal = ({ isOpen, onClose, title, message, isSuccess }) => {
  if (!isOpen) return null;

  const icon = isSuccess ? (
    <Check className="w-16 h-16 text-primary" />
  ) : (
    <AlertCircle className="w-16 h-16 text-red-500" />
  );
  const iconBg = isSuccess ? "bg-primary/10" : "bg-red-500/10";

  return (
    <div className="fixed inset-0 bg-[#00000079] flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-8 text-center shadow-2xl border-2 border-[#F6F6F6]">
        <div
          className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full ${iconBg}`}
        >
          {icon}
        </div>
        <h3 className="mt-5 text-xl font-alexBrush text-[#1b1b1b]">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full rounded-[32px] bg-primary px-4 py-3 text-base font-normal text-white hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const ShareMomentsModal = ({ isOpen, onClose, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const { mutate, isPending: isLoading } = useUploadMomentsImage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(
      (file) => file.type.startsWith("image/") || file.type === "image/gif"
    );

    setUploadedFiles((prevFiles) => {
      const combinedFiles = [...prevFiles, ...validFiles];
      const uniqueFiles = combinedFiles.filter(
        (file, index, self) =>
          index ===
          self.findIndex((f) => f.name === file.name && f.size === file.size)
      );
      const limitedFiles = uniqueFiles.slice(0, 5);
      if (limitedFiles.length > 0 && errors.images) {
        setErrors((prev) => ({ ...prev, images: undefined }));
      }
      return limitedFiles;
    });
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileToRemove);
      if (updatedFiles.length === 0 && errors.images) {
        setErrors((prev) => ({
          ...prev,
          images: "At least one image is required.",
        }));
      }
      return updatedFiles;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (uploadedFiles.length === 0) {
      newErrors.images = "At least one image is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({ fullName: "", email: "", description: "" });
    setUploadedFiles([]);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const uploadData = new FormData();
    uploadData.append("caption", formData.description);
    if (formData.fullName.trim()) uploadData.append("name", formData.fullName);
    if (formData.email.trim()) uploadData.append("email", formData.email);

    uploadedFiles.forEach((file) => {
      uploadData.append("images", file);
    });

    mutate(uploadData, {
      onSuccess: () => {
        resetForm();
        onSuccess();
      },
      onError: () => {
        onError();
      },
    });
  };

  const handleBack = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000079] flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col border-2 border-[#F6F6F6] shadow-lg">
        <div className="sticky top-0 bg-white border-b-2 border-[#F6F6F6] p-6 flex justify-between items-center z-10 rounded-t-lg">
          <div>
            <p className="text-primary font-normal text-xs tracking-[3px] uppercase mb-1">
              Share Memory
            </p>
            <h2 className="text-2xl md:text-3xl font-alexBrush text-[#1b1b1b]">
              Share Your Memories
            </h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white w-10 h-10 rounded-full border-2 border-[#D9ECE7] flex items-center justify-center cursor-pointer hover:bg-[#FDF6F8] transition-colors"
          >
            <X className="text-primary w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto">
          <div>
            <label
              className="block text-[#1b1b1b] text-sm font-normal mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full bg-[#FDF6F8] text-[#1b1b1b] placeholder-gray-500 rounded-lg px-4 py-3 border-2 border-[#F6F6F6] focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              className="block text-[#1b1b1b] text-sm font-normal mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full bg-[#FDF6F8] text-[#1b1b1b] placeholder-gray-500 rounded-lg px-4 py-3 border-2 border-[#F6F6F6] focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              className="block text-[#1b1b1b] text-sm font-normal mb-2"
              htmlFor="description"
            >
              Describe the Moment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Share your beautiful memory..."
              rows={4}
              className={`w-full bg-[#FDF6F8] text-[#1b1b1b] placeholder-gray-500 rounded-lg px-4 py-3 border-2 ${
                errors.description ? "border-red-500" : "border-[#F6F6F6]"
              } focus:border-primary focus:outline-none transition-colors resize-none`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-[#1b1b1b] text-sm font-normal mb-2">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg bg-[#FDF6F8] p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : errors.images
                  ? "border-red-500"
                  : "border-[#D9ECE7] hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                accept="image/*,.gif"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                ref={fileInputRef}
              />
              <div className="space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-[#1b1b1b] text-lg">
                    Drop your images here or
                    <span className="text-primary font-medium cursor-pointer hover:underline">
                      {" "}
                      click to browse
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    PNG, JPG or GIF (max 5 files)
                  </p>
                </div>
              </div>
            </div>
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
            {uploadedFiles.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {uploadedFiles.length} of 5 files selected
              </p>
            )}
            {uploadedFiles.length >= 5 && (
              <p className="text-sm text-red-500 mt-2">
                Maximum 5 files allowed. Remove files to add more.
              </p>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden border-2 border-[#F6F6F6] bg-white"
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-24 object-cover"
                    />
                  ) : (
                    <div className="w-full h-24 bg-[#FDF6F8] flex items-center justify-center text-[#1b1b1b] text-sm">
                      <FileText size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleRemoveFile(file)}
                      className="text-white bg-red-600 rounded-full p-1.5 hover:bg-red-700 transition-colors"
                      title="Remove file"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-[#1b1b1b] text-xs p-2 truncate bg-white border-t border-[#F6F6F6]">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="text-primary flex items-center justify-center gap-2 mt-4">
              <Loader2 className="animate-spin h-5 w-5 text-primary" />
              <span className="text-sm">
                Uploading your beautiful memories...
              </span>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t-2 border-[#F6F6F6] p-6 flex gap-4 z-10 rounded-b-lg">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 bg-transparent border-2 border-[#D9ECE7] text-primary py-3 px-6 rounded-[32px] hover:bg-[#FDF6F8] transition-colors font-normal"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-primary text-white py-3 px-6 rounded-[32px] hover:opacity-90 transition-opacity font-normal disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Sharing..." : "Share Memory"}
          </button>
        </div>
      </div>
    </div>
  );
};
