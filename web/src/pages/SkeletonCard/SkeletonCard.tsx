import { Stack, Typography, Button, Skeleton, Card, CardContent, AspectRatio } from "@mui/joy";

const SkeletonCard = () => {
  return (
    <Stack component="main" spacing={2} useFlexGap>
      <Card variant="outlined" sx={{ width: 450 }}>
        <CardContent orientation="horizontal">
          <Skeleton animation="wave" variant="circular" width={60} height={60} />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 160 }} />
            <Skeleton animation="wave" variant="text" level="body-sm" sx={{ width: 265 }} />
          </div>
        </CardContent>
        <AspectRatio ratio="21/9">
          <Skeleton animation="wave" variant="overlay">
            <img alt="" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
          </Skeleton>
        </AspectRatio>
        <Typography sx={{ overflow: "hidden" }}>
          <Skeleton animation="wave">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
            industries.
          </Skeleton>
        </Typography>
        <Button>
          Read more
          <Skeleton animation="wave" />
        </Button>
      </Card>
    </Stack>
  );
};

export default SkeletonCard;
