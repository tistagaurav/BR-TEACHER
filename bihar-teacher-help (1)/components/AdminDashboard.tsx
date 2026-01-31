import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Layout, Download, RotateCcw, Monitor } from 'lucide-react';
import { TreData, DownloadItem, TreSectionData } from '../types';

interface AdminDashboardProps {
  data: TreData;
  onUpdate: (newData: TreData) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, onUpdate }) => {
  const [activeSection, setActiveSection] = useState<keyof TreData>('tre1');
  const [formData, setFormData] = useState<TreSectionData>(data[activeSection]);
  const [isDirty, setIsDirty] = useState(false);
  
  // New Download Item State
  const [newDownload, setNewDownload] = useState<DownloadItem>({
    title: '',
    size: '1 MB',
    type: 'pdf',
    date: new Date().toISOString().split('T')[0]
  });

  // Update local form when active section changes
  useEffect(() => {
    setFormData(data[activeSection]);
    setIsDirty(false);
  }, [activeSection, data]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const handleBannerChange = (field: string, value: string) => {
    if (!formData.customBanner) return;
    setFormData({
      ...formData,
      customBanner: {
        ...formData.customBanner,
        [field]: value
      }
    });
    setIsDirty(true);
  };

  const handleDeleteDownload = (index: number) => {
    const updatedDownloads = formData.downloads.filter((_, i) => i !== index);
    setFormData({ ...formData, downloads: updatedDownloads });
    setIsDirty(true);
  };

  const handleAddDownload = () => {
    if (!newDownload.title) return;
    const updatedDownloads = [...formData.downloads, newDownload];
    setFormData({ ...formData, downloads: updatedDownloads });
    setNewDownload({
      title: '',
      size: '1 MB',
      type: 'pdf',
      date: new Date().toISOString().split('T')[0]
    });
    setIsDirty(true);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to discard unsaved changes?")) {
      setFormData(data[activeSection]);
      setIsDirty(false);
    }
  };

  const saveChanges = () => {
    const updatedData = {
      ...data,
      [activeSection]: formData
    };
    onUpdate(updatedData);
    setIsDirty(false);
    alert('Changes saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
          <h2 className="text-2xl font-bold flex items-center">
            <Layout className="mr-3" /> Admin Dashboard
          </h2>
          <div className="flex space-x-3">
             {isDirty && (
              <button 
                onClick={handleReset}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center transition"
              >
                <RotateCcw size={18} className="mr-2" /> Reset
              </button>
             )}
            <button 
              onClick={saveChanges}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center transition shadow-lg"
            >
              <Save size={18} className="mr-2" /> Save All Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[600px]">
          {/* Sidebar */}
          <div className="bg-gray-50 border-r border-gray-200 p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Select Section</h3>
            <div className="space-y-2">
              {(Object.keys(data) as Array<keyof TreData>).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (isDirty) {
                      if (window.confirm("You have unsaved changes. Switch anyway?")) setActiveSection(key);
                    } else {
                      setActiveSection(key);
                    }
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition flex justify-between items-center ${
                    activeSection === key 
                      ? 'bg-white text-orange-600 shadow-sm border border-orange-200' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {key === 'bpscTre3' ? 'BPSC TRE 3.0' : key.toUpperCase()}
                  {activeSection === key && <Monitor size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Main Edit Area */}
          <div className="col-span-1 lg:col-span-3 p-6 lg:p-8 overflow-y-auto max-h-[800px]">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center">
              Editing: <span className="text-orange-600 ml-2">{activeSection.toUpperCase()}</span>
            </h3>
            
            {/* General Info */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleTextChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleTextChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            {/* Banner Config - Only if valid for this section */}
            {formData.customBanner && (
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-8">
                 <h4 className="text-blue-800 font-bold mb-3 flex items-center">
                    <Monitor size={18} className="mr-2" /> Banner Configuration
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-blue-700 mb-1">Banner Text</label>
                      <input
                        value={formData.customBanner.text}
                        onChange={(e) => handleBannerChange('text', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-blue-700 mb-1">Button Label</label>
                      <input
                        value={formData.customBanner.buttonText}
                        onChange={(e) => handleBannerChange('buttonText', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-blue-700 mb-1">Sub Text</label>
                      <input
                        value={formData.customBanner.subText || ''}
                        onChange={(e) => handleBannerChange('subText', e.target.value)}
                        className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm"
                      />
                    </div>
                 </div>
              </div>
            )}

            {/* Downloads Management */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Download size={20} className="mr-2" /> Manage Downloads
              </h4>
              
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-600 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-medium">Title</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {formData.downloads.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-4 text-center text-gray-500">No downloads available. Add one below.</td>
                      </tr>
                    ) : (
                      formData.downloads.map((item, idx) => (
                        <tr key={idx} className="bg-white hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                          <td className="px-4 py-3 text-gray-500">{item.date}</td>
                          <td className="px-4 py-3">
                            <button 
                              onClick={() => handleDeleteDownload(idx)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                              title="Delete File"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Add New */}
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <h5 className="font-semibold text-orange-800 mb-3 flex items-center">
                  <Plus size={16} className="mr-1" /> Add New File
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-5">
                    <input
                      placeholder="File Title"
                      value={newDownload.title}
                      onChange={(e) => setNewDownload({...newDownload, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                     <select 
                       value={newDownload.type}
                       onChange={(e) => setNewDownload({...newDownload, type: e.target.value as any})}
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-orange-500 outline-none"
                     >
                       <option value="pdf">PDF</option>
                       <option value="doc">DOC</option>
                       <option value="link">LINK</option>
                     </select>
                  </div>
                  <div className="md:col-span-2">
                    <input
                      placeholder="Size"
                      value={newDownload.size}
                      onChange={(e) => setNewDownload({...newDownload, size: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <button 
                      onClick={handleAddDownload}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg text-sm transition shadow-sm"
                    >
                      Add File
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};