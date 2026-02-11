import { Image as ImageIcon, FileText } from "lucide-react";

export const Hadith = ({
  handleSharePDF,
  handleShareImage,
  hadees,
  linkToAuthenticateHadith,
  totalDonations,
  urduTranslation,
  ref,
}) =>
  hadees && (
    <div className=" max-w-md rounded overflow-hidden shadow-lg mx-auto p-6 mt-2 bg-green-900 text-center text-white">
      <div className="flex flex-row justify-between">
        <a href="/" className="flex">
          <span aria-hidden="true" className="mr-1">
            ←
          </span>
          <p className="text-right text-sm ">Home</p>
        </a>
        {totalDonations !== null && (
          <p className="text-left text-xs">
            Total Donation:{' '}
            <span className="font-bold">{totalDonations.toFixed(2)} RM</span>
          </p>
        )}
      </div>
      <div className="flex flex-row justify-between"></div>
      <h1 className="font-bold text-xl mb-2">Hadees</h1>
      <div className="flex flex-row  gap-4 justify-end">
        <p>Share</p>
        <p className="cursor-pointer" onClick={handleShareImage}>
          <ImageIcon size={20} />
        </p>
        <p className="cursor-pointer" onClick={handleSharePDF}>
          <FileText size={20} />
        </p>
      </div>
      <div className="flex flex-row text-center justify-center gap-4 mb-4 rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black">
        {hadees?.hadiths && hadees?.hadiths.length > 0 && (
          <p>Arabic Number: {hadees?.hadiths[0].arabicnumber}</p>
        )}
        {hadees?.hadiths && hadees?.hadiths.length > 0 && (
          <p>Hadith Number: {hadees?.hadiths[0].hadithnumber}</p>
        )}
      </div>

      {
        <div ref={ref}>
          {hadees?.hadiths && hadees?.hadiths.length > 0 && (
            <a
              href={linkToAuthenticateHadith}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <p className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-blue-600 hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer font-semibold">
                {hadees?.hadiths[0].text}
                <span className="ml-2">↗</span>
              </p>
            </a>
          )}
          {urduTranslation && (
            <a
              href={linkToAuthenticateHadith}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-blue-600 hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer font-semibold">
                <p className="font-bold mb-2">Urdu Translation:</p>
                <p>{urduTranslation}</p>
              </div>
            </a>
          )}
        </div>
      }
      {hadees?.hadiths &&
        hadees?.hadiths.length > 0 &&
        hadees?.hadiths[0].grades?.map((grade, index) => (
          <div
            key={index}
            className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black"
          >
            <p>
              {grade.grade} - {grade.name}
            </p>
          </div>
        ))}
      {hadees?.hadiths && hadees?.hadiths.length > 0 && (
        <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">
          <p>
            book: {hadees?.hadiths[0].reference.book} | hadith:{' '}
            {hadees?.hadiths[0].reference.hadith} | name:{' '}
            {hadees?.metadata.name}
          </p>
        </div>
      )}
      {hadees?.metadata &&
        hadees?.metadata.section &&
        Object.keys(hadees?.metadata.section).map((key) => (
          <div
            key={key}
            className="rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4"
          >
            <p style={{ fontSize: '1.2rem' }}>
              {hadees?.metadata.section[key]}
            </p>
          </div>
        ))}
      {hadees?.metadata &&
        hadees?.metadata.section_detail &&
        Object.keys(hadees?.metadata.section_detail).map((key) => (
          <div key={key}>
            <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">
              <p>
                Arabic number first:{' '}
                {hadees?.metadata.section_detail[key].arabicnumber_first}
              </p>
              <p>
                Arabic number last:{' '}
                {hadees?.metadata.section_detail[key].arabicnumber_last}
              </p>
            </div>
            <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-white text-black text-center justify-center gap-4">
              <p>
                Hadith number first:{' '}
                {hadees?.metadata.section_detail[key].hadithnumber_first}
              </p>
              <p>
                Hadith number last:{' '}
                {hadees?.metadata.section_detail[key].hadithnumber_last}
              </p>
            </div>
          </div>
        ))}
      <div className="text-sm flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-black text-white text-center justify-center gap-4">
        <p className="font-bold">
          On every hadith you read, I will donate 0.10rm to authentic registered
          charity organization
        </p>
      </div>
      <div className="text-sm flex flex-col rounded overflow-hidden shadow-lg p-4 mt-4 bg-black text-white text-center justify-center gap-4">
        <p className="font-bold">
          If you want to donate by youself, Here are some authentic registered
          charity organizations:
        </p>
        <p>
          1. MATW Project -{' '}
          <a
            href="https://matwproject.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://matwproject.org/
          </a>
        </p>
      </div>
      <div className="flex flex-row rounded overflow-hidden shadow-lg p-4 mt-4 bg-gray-800 text-white text-center justify-center gap-4">
        <p className="text-xs">
          Report at zain.ahmed199524@gmail.com, If you found any wrong hadith
        </p>
      </div>
    </div>
  )
    
