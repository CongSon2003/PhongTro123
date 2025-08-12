import React, { useState } from "react";

const Block = () => {
  const [active, Setactive] = useState(1);
  return (
    <div className="mb-[20px]">
      <div className="flex flex-col">
        <div className="mb-[5px]">
          <h1 className="text-[1.8rem] mt-3 font-semibold">Tin tức Cực hot</h1>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-white rounded-md w-2/4">
            <div className="">
              <ul className="flex gap-2">
                <li
                  onClick={() => Setactive(1)}
                  className={`cursor-pointer ${
                    active === 1
                      ? "text-red-500 border-b-[2px] border-[red]"
                      : "opacity-[0.75]"
                  } py-2 px-3 hover:opacity-100`}
                >
                  Tin nổi bật
                </li>
                <li
                  onClick={() => Setactive(2)}
                  className={`cursor-pointer ${
                    active === 2
                      ? "text-red-500 border-b-[2px] border-[red] opacity-100"
                      : "opacity-[0.75]"
                  } py-2 px-3 hover:opacity-100`}
                >
                  Cẩm nang
                </li>
                <li
                  onClick={() => Setactive(3)}
                  className={`cursor-pointer ${
                    active === 3
                      ? "text-red-500 border-b-[2px] border-[red] opacity-100"
                      : "opacity-[0.75]"
                  } py-2 px-3 hover:opacity-100`}
                >
                  Hướng dẫn
                </li>
              </ul>
            </div>
          </div>
          {active === 1 ? (
            <div className="flex gap-9">
              <div className="w-[50%] flex flex-col gap-4">
                <div className="w-full relative h-[400px] bg-no-repeat object-fill">
                  <img
                    src="https://file.phongtro.vn/chuan_phong_tro_moi_tphcm_27b148ed5f.jpg"
                    className="rounded-md w-full h-full"
                  ></img>
                  <div className="absolute left-0 right-0 bottom-2 text-white px-5 py-2">
                    <h3 className="line-clamp-2">
                      TP.HCM: 12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn MớiTP.HCM:
                      12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn MớiTP.HCM: 12.800
                      Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn MớiTP.HCM: 12.800 Nhà Trọ
                      Cần Cải Tạo Để Đạt Chuẩn Mới
                    </h3>
                    <div className="flex justify-between opacity-[0.75]">
                      <p>Tin nổi bật</p>
                      <p>14/10/2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-[50%] h-[200px] relative bg-no-repeat object-fill">
                    <img
                      src="https://file.phongtro.vn/Tan_sinh_vien_soc_vi_gia_phong_tro_b09d2ffd5a.jpg"
                      className="rounded-md w-full h-full"
                    ></img>
                    <div className="absolute left-0 right-0 bottom-2 text-white px-5 py-2">
                      <h3 className="line-clamp-2">
                        TP.HCM: 12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn
                        MớiTP.HCM: 12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn
                        MớiTP.HCM: 12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn
                        MớiTP.HCM: 12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn Mới
                      </h3>
                      <div className="flex justify-between opacity-[0.85]">
                        <p>14/10/2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50%] h-[200px] relative bg-no-repeat object-fill">
                    <img
                      src="https://file.phongtro.vn/Trong_vong_1_nam_qua_gia_thue_can_ho_tai_TPHCM_lien_tuc_tang_7770b59197.jpg"
                      className="rounded-md w-full h-full"
                    ></img>
                    <div className="absolute left-0 right-0 bottom-2 text-white px-5 py-2">
                      <h3 className="line-clamp-2">
                        Giá thuê nhà tại Tp.HCM tăng cao, người trẻ chuyển hướng
                        sang căn hộ ngoại ô xa trung tâm
                      </h3>
                      <div className="flex justify-between opacity-[0.85]">
                        <p>14/10/2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ul>
                  <li className="border-b border-[#dadada] p-2">
                    <p className="opacity-[0.5]">06/10/2024</p>
                    <h3>Nhu cầu thuê căn hộ tại TP.HCM tiếp tục tăng mạnh</h3>
                  </li>
                  <li className="border-b border-[#dadada] p-2">
                    <p className="opacity-[0.5]">03/10/2024</p>
                    <h3>Cập nhật giá thuê phòng trọ tại TPHCM mới nhất</h3>
                  </li>
                  <li className="border-b border-[#dadada] p-2">
                    <p className="opacity-[0.5]">02/10/2024</p>
                    <h3>7 điều phải biết khi thuê phòng trọ</h3>
                  </li>
                  <li className="border-b border-[#dadada] p-2">
                    <p className="opacity-[0.5]">02/10/2024</p>
                    <h3>5 lưu ý khi thuê phòng trọ dành cho tân sinh viên</h3>
                  </li>
                </ul>
              </div>
            </div>
          ) : active === 2 ? (
            <div className="flex gap-9">
              <div className="w-[50%] flex flex-col gap-4">
                <div className="w-full relative h-[400px] bg-no-repeat object-fill">
                  <img
                    src="https://file.phongtro.vn/phongtro_1733423754184.jpg"
                    className="rounded-md w-full h-full"
                  ></img>
                  <div className="absolute left-0 right-0 bottom-2 text-white px-5 py-2">
                    <h3 className="line-clamp-2">
                      TP.HCM: 12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn MớiTP.HCM:
                      12.800 Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn MớiTP.HCM: 12.800
                      Nhà Trọ Cần Cải Tạo Để Đạt Chuẩn MớiTP.HCM: 12.800 Nhà Trọ
                      Cần Cải Tạo Để Đạt Chuẩn Mới
                    </h3>
                    <div className="flex justify-between opacity-[0.75]">
                      <p>Tin nổi bật</p>
                      <p>14/10/2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-[50%] h-[200px] relative bg-no-repeat object-fill">
                    <img
                      src="https://file.phongtro.vn/thue_nha_lam_chung_cu_mini_55096086ff.jpg"
                      className="rounded-md w-full h-full"
                    ></img>
                    <div className="absolute left-0 right-0 bottom-2 text-white px-5 py-2">
                      <h3 className="line-clamp-2">
                        Hợp Đồng Cho Thuê Nhà Làm Chung Cư Mini, Bạn cần lưu ý
                        gì?
                      </h3>
                      <div className="flex justify-between opacity-[0.85]">
                        <p>14/10/2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50%] h-[200px] relative bg-no-repeat object-fill">
                    <img
                      src="https://file.phongtro.vn/sinh_vien_nen_chon_o_phong_tro_hay_chung_cu_1da91e12de.jpg"
                      className="rounded-md w-full h-full"
                    ></img>
                    <div className="absolute left-0 right-0 bottom-2 text-white px-5 py-2">
                      <h3 className="line-clamp-2">
                        Sinh viên nên chọn thuê Phòng trọ hay Chung cư
                      </h3>
                      <div className="flex justify-between opacity-[0.85]">
                        <p>14/10/2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ul>
                  <li className="border-b border-[#dadada] p-2">
                    <p className="opacity-[0.5]">06/10/2024</p>
                    <h3>Phòng trọ sinh viên 1 tháng khoảng bao nhiêu?</h3>
                  </li>
                  <li className="border-b border-[#dadada] p-2">
                    <p className="opacity-[0.5]">03/10/2024</p>
                    <h3>Tiền cọc thuê phòng trọ có lấy lại được không?</h3>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-9">
              <div className="w-[50%] flex flex-col gap-4">
                <div className="w-full relative h-[400px] bg-no-repeat object-fill">
                  <img
                    src="https://file.phongtro.vn/kinh_nghiep_nuoi_thu_cung_tai_phong_tro_f457470580.jpg"
                    className="rounded-md w-full h-full"
                  ></img>
                  <div className="absolute left-0 right-0 bottom-2 text-white px-5 py-2">
                    <h3 className="line-clamp-2">
                      Kinh nghiệm nuôi thú cưng tại phòng trọ
                    </h3>
                    <div className="flex justify-between opacity-[0.75]">
                      <p>Tin nổi bật</p>
                      <p>14/10/2024</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-[50%] h-[200px] relative bg-no-repeat object-fill">
                    <img
                      src="https://file.phongtro.vn/phong_tro_sinh_vien_8f25aa9f03.jpg"
                      className="rounded-md w-full h-full"
                    ></img>
                    <div className="absolute left-0 right-0 bottom-2 text-white px-5 py-2">
                      <h3 className="line-clamp-2">
                        Tìm phòng trọ cho Sinh viên và Lưu ý khi thuê phòng trọ
                      </h3>
                      <div className="flex justify-between opacity-[0.85]">
                        <p>14/10/2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50%] h-[200px] relative bg-no-repeat object-fill">
                    <img
                      src="https://file.phongtro.vn/thu_tuc_thue_phong_tro_cho_nguoi_nuoc_ngoai_85f9262df2.jpg"
                      className="rounded-md w-full h-full"
                    ></img>
                    <div className="absolute left-0 right-0 bottom-2 text-white px-5 py-2">
                      <h3 className="line-clamp-2">
                        Thủ tục thuê nhà trọ, phòng trọ cho người nước ngoài
                      </h3>
                      <div className="flex justify-between opacity-[0.85]">
                        <p>14/10/2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ul>
                  <li className="border-b border-[#dadada] p-2">
                    <p className="opacity-[0.5]">06/10/2024</p>
                    <h3>Phòng trọ sinh viên 1 tháng khoảng bao nhiêu?</h3>
                  </li>
                  <li className="border-b border-[#dadada] p-2">
                    <p className="opacity-[0.5]">03/10/2024</p>
                    <h3>Tiền cọc thuê phòng trọ có lấy lại được không?</h3>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Block;
