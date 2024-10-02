<LoadScript googleMapsApiKey="AIzaSyB8M0ICKS8zNxJxJD42Xq_yAkaZBc5EJAM" libraries={libraries}>
<Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
  <input
    type="text"
    placeholder="Search a place"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className='border  bg-zinc-200 text-zinc-800 placeholder:text-zinc-800 rounded p-2 outline-none  h-10 w-80'
  />
</Autocomplete>
</LoadScript>