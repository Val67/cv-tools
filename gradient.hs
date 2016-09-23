-- Small script to generate a gradient of LaTex colors

data Color = Color Float Float Float deriving (Show)

showColor :: Color -> String
showColor (Color r g b) = show r ++ "," ++ show g ++ "," ++ show b

showColorTex :: Color -> String -> String
showColorTex color name = "\\definecolor{" ++ name ++ "} {RGB}{" ++ (showColor color) ++ "}\n"

gradientStep :: Color -> Color -> Float -> Color
gradientStep (Color r1 g1 b1) (Color r2 g2 b2) step =
  (Color
  (r1 + step*(r2-r1))
  (g1 + step*(g2-g1))
  (b1 + step*(b2-b1)))

makeGradient :: Color -> Color -> Float -> [Color]
makeGradient begin end steps =
  map (\n -> (gradientStep begin end (n/steps))) [0..steps]

c1 = (Color 68 225 130)
c2 = (Color 10 82 216)

main = do
  let listOfColors = (zip [0..] (makeGradient c1 c2 10))
  putStrLn (concat (map
    (\c -> (showColorTex (snd c) ("Gradient" ++ show (fst c))))
    listOfColors))
