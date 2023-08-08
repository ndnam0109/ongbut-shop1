import { useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { RiMapPinLine } from "react-icons/ri";
import { GOOGLE_MAPS_API_KEY} from "@/lib/constants/google.const";
import { useDevice} from "@/lib/hooks/useDevice";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {NotFound} from "@/components/shared/utilities/misc";
import {Spinner} from "@nextui-org/spinner";
import {Input} from "@nextui-org/input";
export function AddressGoogleDialog({ onChange, fullAddress = "", ...props }: any) {
  let [addressText, setAddressText] = useState<string>();
  const [place, setPlace] = useState<google.maps.places.AutocompletePrediction>();
  const { isDesktop } = useDevice();

  useEffect(() => {
    if (place) {
      placesService.getDetails(
        { placeId: place.place_id, fields: ["formatted_address", "geometry"] },
        (result) => {
          onChange({
            name: result.name,
            fullAddress: result.formatted_address,
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
          });
        }
      );
    }
  }, [place]);

  useEffect(() => {
    if (props.isOpen) {
      setAddressText(fullAddress);
      if (!placePredictions.length) {
        getPlacePredictions({
          input: fullAddress,
          componentRestrictions: { country: "vn" },
        });
      }
    }
  }, [props.isOpen]);

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: GOOGLE_MAPS_API_KEY,
    language: "vi",
  });

  return (
    <>
      <Modal
          size={'lg'}
          isOpen={props.isOpen}
          onClose={() => props.onClose()}
      >
        <ModalContent>
          {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Địa chỉ giao hàng</ModalHeader>
                <ModalBody>
                  <div
                      className="bg-white no-scrollbar"
                      style={{
                        minHeight: `${isDesktop ? "600px" : ""} `,
                        height: `${isDesktop ? "auto" : " calc(100vh - 144px)"} `,
                      }}
                  >
                    <div className="sticky top-0 p-4 bg-gray-100">
                      <Input
                          key={'outside'}
                          type="email"
                          label="Bản đồ"
                          labelPlacement={'outside'}
                          description={'outside'}
                      />
                    </div>
                    {!addressText ? (
                        <NotFound icon={<RiMapPinLine />} text="Nhập địa chỉ để tìm kiếm địa điểm giao hàng" />
                    ) : (
                        <>
                          {isPlacePredictionsLoading && <Spinner />}
                          {!isPlacePredictionsLoading && placePredictions && (
                              <>
                                {placePredictions.length ? (
                                    <>
                                      {placePredictions.map((place) => (
                                          <button
                                              type="button"
                                              key={place.place_id}
                                              className="flex items-start w-full p-4 text-gray-600 border-b border-gray-200 animate-emerge hover:bg-primary-light"
                                              onClick={async () => {
                                                setPlace(place);
                                              }}
                                          >
                                            <div className="text-left">
                                              <div className="text-lg font-semibold text-primary">
                                                {place.structured_formatting.main_text}
                                              </div>
                                              <div>{place.structured_formatting.secondary_text}</div>
                                            </div>
                                          </button>
                                      ))}
                                    </>
                                ) : (
                                    <NotFound text="Không tìm thấy địa chỉ" />
                                )}
                              </>
                          )}
                        </>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
