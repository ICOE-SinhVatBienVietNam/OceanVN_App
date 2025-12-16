import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

function PwaUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('Service Worker registered:', r);
    },
    onRegisterError(error: any) {
      console.log('Service Worker registration error:', error);
    },
  });

  const close = () => {
    setNeedRefresh(false);
  };

  if (!needRefresh) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100] bg-mainDark text-white mainShadow rounded-main p-5 flex flex-col gap-3.5 w-[300px]">
      <div className="w-full">
        <h4 className="leading-none! text-white">Có bản cập nhật mới</h4>
        <p className="text-csNormal text-white">Ứng dụng đã được cập nhật, hãy tải lại để sử dụng phiên bản mới nhất.</p>
      </div>
      <div className="w-full flex items-center-safe gap-2.5">
        <button 
          onClick={() => updateServiceWorker(true)}
          className="flex-1 bg-mainRed text-white text-csMedium font-medium py-2.5! rounded-small!"
        >
          Cập nhật
        </button>
        <button 
          onClick={close}
          className="flex-1 bg-gray text-white text-csMedium font-medium py-2.5! rounded-small!"
        >
          Để sau
        </button>
      </div>
    </div>
  );
}

export default PwaUpdatePrompt;
