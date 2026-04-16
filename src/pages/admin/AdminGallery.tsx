import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Search, Image, Upload, Loader2, GripVertical, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const AdminGallery = () => {
  const { 
    apiGallery, 
    loadGallery, 
    createGalleryBulk, 
    updateGalleryMeta, 
    deleteGalleryApi,
    galleryLoading,
    galleryError 
  } = useAdmin();
  
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ displayOrder: 0, isActive: true });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageOrders, setImageOrders] = useState<number[]>([]);

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const startIndex = selectedFiles.length;
      setSelectedFiles([...selectedFiles, ...newFiles]);
      setImageOrders([...imageOrders, ...newFiles.map((_, idx) => startIndex + idx + 1)]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const addMoreImages = () => {
    fileInputRef.current?.click();
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    try {
      await createGalleryBulk(selectedFiles, imageOrders);
      toast.success("Images uploaded successfully");
      setSelectedFiles([]);
      setImageOrders([]);
      setOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const removeSelectedImage = (index: number) => {
    const newFiles = [...selectedFiles];
    const newOrders = [...imageOrders];
    newFiles.splice(index, 1);
    newOrders.splice(index, 1);
    setSelectedFiles(newFiles);
    setImageOrders(newOrders);
  };

  const handleOrderChange = (index: number, value: number) => {
    const newOrders = [...imageOrders];
    newOrders[index] = value;
    setImageOrders(newOrders);
  };

  const handleUpdateMeta = async (id: number) => {
    try {
      await updateGalleryMeta(id, editForm);
      setEditMode(null);
      toast.success("Image updated successfully");
    } catch (error) {
      toast.error("Failed to update image");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteGalleryApi(id);
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  const openEditDialog = (image: { id: number; displayOrder: number; isActive: boolean }) => {
    setEditMode(image.id);
    setEditForm({ displayOrder: image.displayOrder, isActive: image.isActive });
  };

  const filteredGallery = apiGallery.filter(img => 
    img.imageUrl.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading">Manage Gallery</h1>
            <p className="text-muted-foreground mt-1">{apiGallery.length} images total</p>
          </div>
          <Dialog open={open} onOpenChange={(isOpen) => {
              if (!isOpen) {
                setSelectedFiles([]);
                setImageOrders([]);
              }
              setOpen(isOpen);
            }}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)} className="w-full sm:w-auto">
                <Upload size={16} />
                <span className="ml-2 hidden sm:inline">Upload Images</span>
                <span className="sm:hidden">Upload</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Bulk Upload Gallery Images</DialogTitle></DialogHeader>
              <form onSubmit={handleBulkUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Images *</Label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    You can select multiple images at once (hold Ctrl/Cmd to select more)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={addMoreImages} disabled={!open}>
                    <Plus size={16} className="mr-2" />
                    Add More Images
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setSelectedFiles([]);
                      setImageOrders([]);
                    }}
                    disabled={selectedFiles.length === 0}
                    className="text-destructive"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear All
                  </Button>
                </div>
                {selectedFiles.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Selected Images ({selectedFiles.length})</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                      {selectedFiles.map((file, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border group">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeSelectedImage(idx)}
                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                            <div className="flex items-center gap-1">
                              <Label className="text-xs text-white">Order:</Label>
                              <Input
                                type="number"
                                min={1}
                                value={imageOrders[idx]}
                                onChange={(e) => handleOrderChange(idx, parseInt(e.target.value) || 1)}
                                className="h-6 text-xs py-0 px-1 bg-white/20 border-white/30 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  {selectedFiles.length} image(s) selected • Click "Add More" to add more • Set display order for each image
                </p>
                <Button type="submit" className="w-full" disabled={uploading || selectedFiles.length === 0}>
                  {uploading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} className="mr-2" />
                      Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {galleryLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={32} className="animate-spin text-muted-foreground" />
          </div>
        ) : galleryError ? (
          <div className="text-center py-16">
            <p className="text-destructive mb-4">{galleryError}</p>
            <Button onClick={() => loadGallery()}>Retry</Button>
          </div>
        ) : (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search gallery..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {filteredGallery.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                  <Image size={32} className="text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground mb-4">No gallery images found</p>
                <Button onClick={() => setOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Upload your first image
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {filteredGallery.map((img) => (
                  <Card 
                    key={img.id} 
                    className="group relative overflow-hidden border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={img.imageUrl} 
                          alt={`Gallery image ${img.id}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {!img.isActive && (
                          <div className="absolute top-2 left-2 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-lg">
                            Hidden
                          </div>
                        )}
                        
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform flex gap-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="flex-1 h-8"
                            onClick={() => setSelectedImage(img.id)}
                          >
                            <Eye size={14} />
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="flex-1 h-8"
                            onClick={() => openEditDialog(img)}
                          >
                            <GripVertical size={14} />
                          </Button>
                        </div>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete this image?</AlertDialogTitle>
                              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(img.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical size={14} className="text-muted-foreground" />
                          <span className="text-sm font-medium">#{img.displayOrder}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={async () => {
                            try {
                              await updateGalleryMeta(img.id, { isActive: !img.isActive });
                              toast.success(img.isActive ? "Image hidden" : "Image shown");
                            } catch (error) {
                              toast.error("Failed to update visibility");
                            }
                          }}
                        >
                          {img.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
            <DialogHeader className="p-4">
              <DialogTitle>View Image</DialogTitle>
            </DialogHeader>
            <div className="relative">
              {apiGallery.find(g => g.id === selectedImage) && (
                <img 
                  src={apiGallery.find(g => g.id === selectedImage)?.imageUrl} 
                  alt="Gallery preview"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editMode} onOpenChange={() => setEditMode(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Image Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={editForm.displayOrder}
                  onChange={(e) => setEditForm({ ...editForm, displayOrder: parseInt(e.target.value) || 0 })}
                  min={0}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Active / Visible</Label>
                <Switch
                  checked={editForm.isActive}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, isActive: checked })}
                />
              </div>
              <Button className="w-full" onClick={() => editMode && handleUpdateMeta(editMode)}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
